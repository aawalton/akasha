#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'

// ===== health-sync-on-foreground seam ========================================
// Runs the health drain when the app comes forward, which is the one moment the phone is
// certainly unlocked.
//
// WHY THE PHONE BEING UNLOCKED IS THE WHOLE POINT. HealthKit's store is encrypted while the
// device is locked and every read against it fails with errorDatabaseInaccessible, so a
// Shortcuts automation on a timer works only where the phone happens to be unlocked at that
// instant. On 2026-09-11 the 11:30 automation reported exactly that for both metrics. Nothing
// on this device can schedule "unlocked" — but the app coming forward IS unlocked, and Alan
// opens the app at least once a day.
//
// A PLUGIN OBSERVER, NOT `extension AppDelegate applicationDidBecomeActive`: the Capacitor
// base template already declares that method, and an extension redeclaring it would not
// compile. This mirrors WidgetRefreshPlugin, which is here for the same reason. The observer
// is installed at bridge setup, before the first didBecomeActive fires, so a cold launch
// syncs too.
//
// THROTTLED, because didBecomeActive fires on every return to the foreground, including every
// app switch. Once an hour is far oftener than a daily drain needs, and it keeps an afternoon
// of switching between apps from filing a report every few minutes.
//
// THE HOUR IS SPENT BEFORE THE RUN RATHER THAN AFTER IT, which also serves as the guard
// against two foregrounds starting two overlapping runs. It costs the case where iOS suspends
// the run because Alan left at once: that hour is spent on a run that did nothing. Nothing is
// lost by it — an anchor advances only on an acknowledged batch, so the next run sends the
// same samples again.
@objc(HealthSyncOnForegroundPlugin)
public class HealthSyncOnForegroundPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "HealthSyncOnForegroundPlugin"
    public let jsName = "HealthSyncOnForeground"
    public let pluginMethods: [CAPPluginMethod] = []

    private static let lastRunKey = "healthSamples.lastForegroundRunAt"
    private static let restSeconds: TimeInterval = 3600

    public override func load() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(syncHealthSamples),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
    }

    // `double(forKey:)` answers 0 for a key never written, so the first foreground after an
    // install runs rather than waiting out an hour it never spent.
    @objc private func syncHealthSamples() {
        guard #available(iOS 16.0, *) else { return }
        let defaults = UserDefaults.standard
        let last = defaults.double(forKey: HealthSyncOnForegroundPlugin.lastRunKey)
        let now = Date().timeIntervalSince1970
        guard now - last >= HealthSyncOnForegroundPlugin.restSeconds else { return }
        defaults.set(now, forKey: HealthSyncOnForegroundPlugin.lastRunKey)
        Task {
            _ = await StreamHealthSamplesIntent.run(noticing: false)
        }
    }
}
SWIFT_HEALTH_SAMPLES
echo "OK: appended HealthSyncOnForegroundPlugin to $APPDELEGATE"
