#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 05-plugins.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
if [[ "$APS_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_PUSH'

// ===== apns push-registration AppDelegate forwarding seam ====================
// @capacitor/push-notifications requires the AppDelegate to forward the OS's
// remote-notification registration result into Capacitor's NotificationCenter;
// without this, PushNotifications.register()'s `registration` / `registrationError`
// JS listeners never fire (Capacitor does not add these for you). Added as an
// extension because the seam appends top-level Swift — these are optional
// UIApplicationDelegate methods (no `override`). The web app's PushRegistrationSync
// component then POSTs the delivered token to /api/push/register (#15407).
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
