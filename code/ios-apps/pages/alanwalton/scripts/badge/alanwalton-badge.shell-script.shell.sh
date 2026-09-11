#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 05-plugins.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
if [[ "$BADGE_RESYNC_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_BADGE'

// ===== badge-set seam ========================================================
// A CAPPlugin exposing setCount({ count }) — sets the app-icon badge to
// max(0, count) via UNUserNotificationCenter.setBadgeCount (iOS 16+) with an
// applicationIconBadgeNumber fallback, on the main queue. NOTHING CALLS IT NOW. The web
// BadgeSync seam re-applied the true open-question count on launch / foreground / in-app
// resolution, healing the stale-badge class where a badge-only APNs push is accepted but
// not applied by current iOS (#15578); the questions system it counted is gone and no
// other count was ever set here, so that seam went and this plugin has no caller left.
// A JS-method plugin (mirrors NativeAudio),
// NOT an observer. Registered in packageClassList (§2c-iv). Needs import
// UserNotifications.
@objc(BadgePlugin)
public class BadgePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "BadgePlugin"
    public let jsName = "Badge"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "setCount", returnType: CAPPluginReturnPromise)
    ]

    @objc func setCount(_ call: CAPPluginCall) {
        let count = max(0, call.getInt("count") ?? 0)
        DispatchQueue.main.async {
            if #available(iOS 16.0, *) {
                UNUserNotificationCenter.current().setBadgeCount(count) { error in
                    if let error = error {
                        call.reject("setBadgeCount failed: \(error.localizedDescription)")
                    } else {
                        call.resolve(["count": count])
                    }
                }
            } else {
                UIApplication.shared.applicationIconBadgeNumber = count
                call.resolve(["count": count])
            }
        }
    }
}
SWIFT_BADGE
echo "OK: appended BadgePlugin to $APPDELEGATE"
else
echo "OK: badge-set seam SKIPPED — NATIVE_SHELL_BADGE_RESYNC=0 (no Swift appended)."
fi
