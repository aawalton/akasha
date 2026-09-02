#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 05-plugins.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
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
