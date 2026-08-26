#!/usr/bin/env bash

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
// An observer installed by a CAPPlugin's load(), as WidgetRefreshPlugin above and
// for the same reason: the Capacitor base template already declares
// `application(_:open:)`, so an extension redeclaring it would not compile.
// Registered in packageClassList (§2c-vii) — the class alone would never load.
//
// THE TILE'S URL IS DELIBERATELY UNROUTABLE. Every other widget here carries
// `capacitor://localhost/nav/…`, which DeepLinkOpenSync turns into an in-app
// navigation; this one carries `capacitor://monarch-relay`, whose empty path fails
// `safeInternalPath` — so the web view stays where it was while this relay runs.
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
echo "OK: monarch-tap relay seam SKIPPED (NATIVE_SHELL_MONARCH_TAP=0) — no Swift appended."
fi

native_shell_stamp_app "$APPDELEGATE"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  let changed = false;
  for (const cls of ["NativeAudioPlugin", "CrashCapturePlugin"]) {
    if (!cfg.packageClassList.includes(cls)) {
      cfg.packageClassList.push(cls);
      changed = true;
      console.log("OK: registered " + cls + " in packageClassList of " + p);
    } else {
      console.log("OK: " + cls + " already in packageClassList of " + p);
    }
  }
  if (changed) fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
' "$CONFIG"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "KeyboardAccessorySuppressorPlugin";
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
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (suppressor disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$KEYBOARD_SUPPRESS_ENABLED"

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

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "BadgePlugin";
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
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (badge-set disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$BADGE_RESYNC_ENABLED"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "KokoroTtsPlugin";
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
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (kokoro-tts disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$KOKORO_TTS_ENABLED"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "DeviceSecretPlugin";
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
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (device-secret disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$DEVICE_SECRET_ENABLED"

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
