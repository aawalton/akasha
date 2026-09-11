#!/usr/bin/env bash

if [[ ! -f "$APPDELEGATE" ]]; then
  echo "ERROR: $APPDELEGATE not found — run 'npx cap add ios' first." >&2
  exit 1
fi

if [[ "$WIDGET_REFRESH_ENABLED" == "1" ]]; then
  if ! grep -q '^import WidgetKit$' "$APPDELEGATE"; then
    awk '{ print } /^import Capacitor/ && !done { print "import WidgetKit"; done = 1 }' \
      "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
    mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
    echo "OK: added 'import WidgetKit' to $APPDELEGATE"
  fi
elif grep -q '^import WidgetKit$' "$APPDELEGATE"; then
  grep -v '^import WidgetKit$' "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
  mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
  echo "OK: removed 'import WidgetKit' from $APPDELEGATE"
fi

WIDGET_REFRESH_MARKER='// ===== widget-refresh-on-foreground seam'
FIRST_SEAM_LINE=$(grep -nF -e "$WIDGET_REFRESH_MARKER" "$APPDELEGATE" | head -1 | cut -d: -f1 || true)
if [[ -n "$FIRST_SEAM_LINE" ]]; then
  head -n "$((FIRST_SEAM_LINE - 1))" "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
  mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
  echo "OK: stripped the previously-applied widget-refresh seam from $APPDELEGATE"
fi
awk 'NF{last=NR} {line[NR]=$0} END{for (i=1;i<=last;i++) print line[i]}' \
  "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"

if [[ "$WIDGET_REFRESH_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_WIDGET_REFRESH'

// ===== widget-refresh-on-foreground seam =====================================
// Reloads the home-screen WidgetKit timelines on every foreground transition, so
// opening the app hydrates the ring immediately instead of waiting out WidgetKit's
// own ~15-minute budget (#15470 on the sibling shell, #18178 here). No JS methods:
// this plugin exists only for the observer its load() installs. Registered in
// packageClassList (§3c). reloadAllTimelines() counts against the WidgetKit reload
// budget, but foreground-triggered reloads are treated generously.
@objc(WidgetRefreshPlugin)
public class WidgetRefreshPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "WidgetRefreshPlugin"
    public let jsName = "WidgetRefresh"
    public let pluginMethods: [CAPPluginMethod] = []

    public override func load() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(reloadAllWidgetTimelines),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
    }

    @objc private func reloadAllWidgetTimelines() {
        if #available(iOS 14.0, *) {
            WidgetCenter.shared.reloadAllTimelines()
        }
    }
}
SWIFT_WIDGET_REFRESH
echo "OK: appended WidgetRefreshPlugin to $APPDELEGATE"
else
echo "OK: widget-refresh seam (§3) SKIPPED — NATIVE_SHELL_WIDGET_REFRESH=0 (no Swift appended)."
fi

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "WidgetRefreshPlugin";
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  const has = cfg.packageClassList.includes(cls);
  if (enabled && !has) {
    cfg.packageClassList.push(cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: registered " + cls + " in packageClassList of " + p);
  } else if (!enabled && has) {
    cfg.packageClassList = cfg.packageClassList.filter((c) => c !== cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (widget-refresh disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$WIDGET_REFRESH_ENABLED"

MONARCH_TAP_MARKER='// ===== monarch-tap relay seam'
FIRST_MONARCH_LINE=$(grep -nF -e "$MONARCH_TAP_MARKER" "$APPDELEGATE" | head -1 | cut -d: -f1 || true)
if [[ -n "$FIRST_MONARCH_LINE" ]]; then
  head -n "$((FIRST_MONARCH_LINE - 1))" "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
  mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
  echo "OK: stripped the previously-applied monarch-tap seam from $APPDELEGATE"
fi
awk 'NF{last=NR} {line[NR]=$0} END{for (i=1;i<=last;i++) print line[i]}' \
  "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"

if [[ "$MONARCH_TAP_ENABLED" == "1" ]]; then
{
cat <<'SWIFT_MONARCH_TAP_HEAD'

// ===== monarch-tap relay seam ================================================
// A tap on the categorize ring, relayed out to the Monarch app (#18178).
//
// WHY A RELAY AT ALL. iOS hands a widget's `.widgetURL` to the CONTAINING app and
// resolves nothing else — a custom scheme or a universal link inside that URL is
// not followed — so the tile cannot reach Monarch on its own. This app launches,
// recognises the URL and opens Monarch itself. Alan ruled the visible flash of
// this app on the way acceptable rather than something to design around.
//
// An observer installed by a CAPPlugin's load(), exactly as WidgetRefreshPlugin
// above and for the same reason: the Capacitor base template already declares
// `application(_:open:)`, so an extension redeclaring it would not compile.
// Registered in packageClassList (§4b) — the class alone would never load.
@objc(MonarchRelayPlugin)
public class MonarchRelayPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "MonarchRelayPlugin"
    public let jsName = "MonarchRelay"
    public let pluginMethods: [CAPPluginMethod] = []

    /// The host the tile's `.widgetURL` carries. Matched on the HOST because that URL
    /// deliberately carries no path: an empty path is what a shell's deep-link guard
    /// refuses, so the relay URL cannot also be read as an in-app route.
    private static let relayHost = "monarch-relay"

SWIFT_MONARCH_TAP_HEAD

native_shell_monarch_url_swift

cat <<'SWIFT_MONARCH_TAP_TAIL'

    private var armed = false

    public override func load() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(relayOpenURL(_:)),
            name: Notification.Name.capacitorOpenURL,
            object: nil
        )
    }

    @objc private func relayOpenURL(_ notification: Notification) {
        // Capacitor carries the opened URL on the notification's OBJECT. Reading
        // userInfo as well costs one line and removes a SILENT failure: picking the
        // wrong carrier compiles and simply never relays, which looks exactly like the
        // tap not being wired up at all.
        let payload = (notification.object as? [String: Any]) ?? (notification.userInfo as? [String: Any])
        guard let url = payload?["url"] as? URL, url.host == Self.relayHost else { return }
        DispatchQueue.main.async { self.openMonarchWhenActive() }
    }

    /// A COLD LAUNCH DELIVERS THE URL BEFORE THE APP IS ACTIVE, and UIApplication will
    /// not open anything from an inactive app. Opening regardless would drop the tap
    /// here, in this app, which is the single outcome this seam exists to prevent — so
    /// an inactive app arms the open for the next didBecomeActive instead.
    private func openMonarchWhenActive() {
        guard UIApplication.shared.applicationState == .active else {
            guard !armed else { return }
            armed = true
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(openArmedMonarch),
                name: UIApplication.didBecomeActiveNotification,
                object: nil
            )
            return
        }
        openMonarch()
    }

    @objc private func openArmedMonarch() {
        guard armed else { return }
        armed = false
        NotificationCenter.default.removeObserver(
            self, name: UIApplication.didBecomeActiveNotification, object: nil
        )
        openMonarch()
    }

    /// `universalLinksOnly` IS THE POINT of the first open: it asks iOS for the MONARCH
    /// APP and refuses to settle for Safari, so `opened == false` means Monarch is not
    /// installed or its universal link is not being honoured, rather than the tap having
    /// quietly gone to the web. Only then does the plain open run — which lands on
    /// Monarch's own sign-in page carrying this whole link in its `route=`, a Monarch
    /// screen naming itself rather than a blank one of ours.
    private func openMonarch() {
        UIApplication.shared.open(Self.monarchURL, options: [.universalLinksOnly: true]) { opened in
            if !opened {
                UIApplication.shared.open(Self.monarchURL, options: [:], completionHandler: nil)
            }
        }
    }
}
SWIFT_MONARCH_TAP_TAIL
} >> "$APPDELEGATE"
echo "OK: appended MonarchRelayPlugin to $APPDELEGATE"
else
echo "OK: monarch-tap seam (§4) SKIPPED — NATIVE_SHELL_MONARCH_TAP=0 (no Swift appended)."
fi

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "MonarchRelayPlugin";
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  const has = cfg.packageClassList.includes(cls);
  if (enabled && !has) {
    cfg.packageClassList.push(cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: registered " + cls + " in packageClassList of " + p);
  } else if (!enabled && has) {
    cfg.packageClassList = cfg.packageClassList.filter((c) => c !== cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (monarch-tap disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$MONARCH_TAP_ENABLED"

APS_MARKER='// ===== apns push-registration AppDelegate forwarding seam'
FIRST_APS_LINE=$(grep -nF -e "$APS_MARKER" "$APPDELEGATE" | head -1 | cut -d: -f1 || true)
if [[ -n "$FIRST_APS_LINE" ]]; then
  head -n "$((FIRST_APS_LINE - 1))" "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
  mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
  echo "OK: stripped the previously-applied apns-registration seam from $APPDELEGATE"
fi
awk 'NF{last=NR} {line[NR]=$0} END{for (i=1;i<=last;i++) print line[i]}' \
  "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"

if [[ "$APS_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_PUSH'

// ===== apns push-registration AppDelegate forwarding seam ====================
// @capacitor/push-notifications requires the AppDelegate to forward the OS's
// remote-notification registration result into Capacitor's NotificationCenter;
// without this, PushNotifications.register()'s `registration` / `registrationError`
// JS listeners never fire (Capacitor does not add these for you). Added as an
// extension because the seam appends top-level Swift — these are optional
// UIApplicationDelegate methods (no `override`).
//
// THE LISTENER RUNS ON smilingjenny.me, NOT ON THE BUNDLED www/index.html. This
// shell boots a local page that redirects to the live site, and Capacitor calls
// bridge.reset() on didStartProvisionalNavigation — which removes every plugin
// listener. A registration listener added before the redirect is destroyed by it.
// The bridge itself survives: its user scripts and the "bridge" message handler
// are installed on the webview's WKUserContentController, which is not scoped to
// an origin, so window.Capacitor.Plugins is present on the remote page too.
extension AppDelegate {
    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        NotificationCenter.default.post(
            name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken
        )
    }

    func application(
        _ application: UIApplication,
        didFailToRegisterForRemoteNotificationsWithError error: Error
    ) {
        NotificationCenter.default.post(
            name: .capacitorDidFailToRegisterForRemoteNotifications, object: error
        )
    }
}
SWIFT_PUSH
echo "OK: appended APNs push-registration AppDelegate forwarding to $APPDELEGATE"
else
echo "OK: APNs push-registration forwarding seam SKIPPED — NATIVE_SHELL_APS=0 (no Swift appended)."
fi
