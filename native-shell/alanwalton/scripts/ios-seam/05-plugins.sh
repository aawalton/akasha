#!/usr/bin/env bash

if [[ "$KEYBOARD_SUPPRESS_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_KBD'

// ===== keyboard-accessory suppressor seam ====================================
// Removes the native WKWebView keyboard input-accessory bar — the up / down / Done
// pill iOS draws above the software keyboard. The block editor renders its OWN in-DOM
// accessory bar (#15050); without this, iOS stacks its native pill BELOW ours, so the
// user sees TWO bars (#15050 device verification: "doubled bars"). The bar is NOT a
// property of WKWebView — it comes from the private WKContentView that becomes first
// responder while a web input is focused — so we override THAT class's
// `inputAccessoryView` getter to return nil.
//
// The classic swizzle (Alan-approved 2026-07-11 over @capacitor/keyboard, which would
// change the keyboard-resize semantics the #15050 anchoring fix depends on): install an
// `inputAccessoryView` override that returns nil directly onto WKContentView via the
// Obj-C runtime. WKContentView inherits the getter from UIResponder (which yields the
// native bar), so class_addMethod SUCCEEDS the first time (the class has no own impl),
// adding our override; a second call in the same process finds the own impl and replaces
// it — idempotent. Private-API-adjacent but well-worn, App-Store-tolerant, works iOS
// 17/18; revisit on a major iOS bump.
//
// Runs from a CAPPlugin load() (mirrors CrashCapturePlugin): load() fires at bridge
// setup, by which point WebKit is loaded so NSClassFromString("WKContentView") resolves.
// Registered by adding the @objc class name to packageClassList (§2c-ii). No JS methods —
// it exists only for its launch-time load() side effect.
@objc(KeyboardAccessorySuppressorPlugin)
public class KeyboardAccessorySuppressorPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "KeyboardAccessorySuppressorPlugin"
    public let jsName = "KeyboardAccessorySuppressor"
    public let pluginMethods: [CAPPluginMethod] = []

    public override func load() {
        guard let contentViewClass: AnyClass = NSClassFromString("WKContentView") else {
            NSLog("[KeyboardAccessorySuppressor] WKContentView not found — native accessory bar NOT suppressed")
            return
        }
        let selector = NSSelectorFromString("inputAccessoryView")
        // The block takes only the receiver (imp_implementationWithBlock omits _cmd) and
        // returns nil so no accessory view is offered. Type encoding "@@:" = returns id (@),
        // args self (@) and _cmd (:).
        let block: @convention(block) (AnyObject) -> UIView? = { _ in nil }
        let imp = imp_implementationWithBlock(block)
        if !class_addMethod(contentViewClass, selector, imp, "@@:") {
            if let method = class_getInstanceMethod(contentViewClass, selector) {
                method_setImplementation(method, imp)
            }
        }
        NSLog("[KeyboardAccessorySuppressor] inputAccessoryView override installed on WKContentView")
    }
}
SWIFT_KBD
echo "OK: appended KeyboardAccessorySuppressorPlugin to $APPDELEGATE"
else
echo "OK: keyboard-accessory suppressor seam SKIPPED — NATIVE_SHELL_KEYBOARD_SUPPRESS=0 (no Swift appended)."
fi

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

if [[ "$BADGE_RESYNC_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_BADGE'

// ===== badge-set seam ========================================================
// A CAPPlugin exposing setCount({ count }) — sets the app-icon badge to
// max(0, count) via UNUserNotificationCenter.setBadgeCount (iOS 16+) with an
// applicationIconBadgeNumber fallback, on the main queue. The web BadgeSync seam
// calls it to re-apply the true open-question count on launch / foreground / in-app
// resolution, healing the stale-badge class where a badge-only APNs push is accepted
// but not applied by current iOS (#15578). A JS-method plugin (mirrors NativeAudio),
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

if [[ "$WALLPAPER_INTENT_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_WALLPAPER'

// ===== get-wallpaper app intent seam =========================================
// A native App Intent that surfaces "Get AlanWalton Wallpaper" as a first-class action in the
// Shortcuts app (auto-registered via AppShortcutsProvider), replacing Alan's hand-built wallpaper
// Shortcut with native, testable connectivity logic. It fetches the CURRENT wallpaper PNG from
// the same public endpoint the old Shortcut used and returns it as an OPTIONAL image, so offline
// / any failure is a clean no-op (the wallpaper is left untouched). Alan's automation is
// [Get Wallpaper] -> (If has value) -> Set Wallpaper: the nil path drops out at the guard with NO
// "Shortcut Failed" error spam. Unlike the CAPPlugin seams above this is NOT a Capacitor plugin —
// App Intents are discovered by iOS from the compiled app binary, so it carries NO
// packageClassList entry; it only has to compile into the App target (AppDelegate.swift already
// is one). No caching, no App Group, no entitlement (Alan's do-nothing-offline choice).
// @available(iOS 16.0, *) guards the App Intents API so a Kokoro-off build (deployment target 15)
// still compiles; the shipped build targets iOS 17.
@available(iOS 16.0, *)
struct GetWallpaperIntent: AppIntent {
    static var title: LocalizedStringResource = "Get AlanWalton Wallpaper"
    static var description = IntentDescription(
        "Fetches the current AlanWalton wallpaper image. Returns nothing when offline or on any failure, so a following Set Wallpaper action is a clean no-op."
    )
    // Never launch the app — this runs in the background from Alan's app-open automation.
    static var openAppWhenRun: Bool = false

    func perform() async throws -> some IntentResult & ReturnsValue<IntentFile?> {
        // 1. Native connectivity gate. Offline returns nil immediately, so airplane mode never
        //    waits out a fetch timeout and never surfaces an error.
        guard await GetWallpaperIntent.isNetworkAvailable() else {
            return .result(value: nil)
        }
        // 2. Fetch the current wallpaper PNG. ANY failure (throw, non-200, empty body) is caught
        //    and collapses to nil — the intent never surfaces an error.
        guard let file = try? await GetWallpaperIntent.fetchWallpaper() else {
            return .result(value: nil)
        }
        return .result(value: file)
    }

    // One-shot NWPathMonitor: start, await the first path update, cancel. The handler runs on a
    // dedicated SERIAL queue, so the `resumed` guard needs no lock — the continuation resumes
    // exactly once even though pathUpdateHandler can fire repeatedly.
    private static func isNetworkAvailable() async -> Bool {
        let monitor = NWPathMonitor()
        let queue = DispatchQueue(label: "com.alanwalton.app.wallpaper.nwpath")
        return await withCheckedContinuation { (continuation: CheckedContinuation<Bool, Never>) in
            var resumed = false
            monitor.pathUpdateHandler = { path in
                guard !resumed else { return }
                resumed = true
                monitor.cancel()
                continuation.resume(returning: path.status == .satisfied)
            }
            monitor.start(queue: queue)
        }
    }

    // URLSession GET of the public wallpaper endpoint, mirroring the widget fetch pattern:
    // .reloadIgnoringLocalCacheData (so we never receive a 304), a 15s timeout, and a 200-only
    // guard. Returns a png-typed IntentFile the Shortcuts "Set Wallpaper" action consumes as an
    // image. Throws on any non-200 / empty body so perform() maps it to nil.
    private static func fetchWallpaper() async throws -> IntentFile {
        let endpoint = URL(string: "https://alanwalton.com/api/wallpaper")!
        var request = URLRequest(url: endpoint)
        request.cachePolicy = .reloadIgnoringLocalCacheData
        request.timeoutInterval = 15
        let (data, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse, http.statusCode == 200, !data.isEmpty else {
            throw WallpaperIntentError.badResponse
        }
        return IntentFile(data: data, filename: "wallpaper.png", type: .png)
    }
}

private enum WallpaperIntentError: Error { case badResponse }
SWIFT_WALLPAPER
echo "OK: appended GetWallpaperIntent to $APPDELEGATE"
else
echo "OK: get-wallpaper app intent seam SKIPPED — NATIVE_SHELL_WALLPAPER_INTENT=0 (no Swift appended)."
fi
