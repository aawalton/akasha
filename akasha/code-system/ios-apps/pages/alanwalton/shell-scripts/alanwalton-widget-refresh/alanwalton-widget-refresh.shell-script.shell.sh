#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 05-plugins.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
if [[ "$WIDGET_REFRESH_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_WIDGET_REFRESH'

// ===== widget-refresh-on-foreground seam =====================================
// Refreshes all home-screen WidgetKit timelines on every foreground transition so
// opening the app hydrates every widget immediately instead of waiting out their
// ~15-min WidgetKit timeline (#15470). A CAPPlugin (mirrors CrashCapturePlugin) whose
// load() subscribes to UIApplication.didBecomeActiveNotification and calls
// WidgetCenter.shared.reloadAllTimelines(). It is a plugin observer, NOT an
// `extension AppDelegate applicationDidBecomeActive` — the Capacitor base template
// already declares that method, so an extension redeclaration would not compile. The
// observer is installed at bridge setup (during didFinishLaunching), before the first
// didBecomeActive fires, so a cold launch refreshes as well. No JS methods; registered
// in packageClassList (§2c-iii). reloadAllTimelines() counts against the WidgetKit
// reload budget, but foreground-triggered reloads are treated generously.
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
echo "OK: widget-refresh seam SKIPPED — NATIVE_SHELL_WIDGET_REFRESH=0 (no Swift appended)."
fi
