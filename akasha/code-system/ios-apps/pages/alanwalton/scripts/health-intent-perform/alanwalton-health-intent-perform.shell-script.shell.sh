#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'

    /// The one thing a headless run can do that reaches Alan.
    ///
    /// Every return below hands back a sentence saying what the run did, and this seam already
    /// knows what that sentence is worth: #17551 lost six days while the phone reported the reason
    /// on every run, because a run fired by a Shortcuts automation returns its String to nobody.
    /// NSLog is no better a reader — the only thing that reads this app's console is
    /// `alanwalton-capture-device-console`, which needs a cable and relaunches the app, and a
    /// background run is in neither state. So the sentence is posted as a local notification too.
    /// It needs no credential, no network and no route, which is the whole point: the branch this
    /// was written for is the one where the device holds no credential and can reach nothing.
    ///
    /// EVERY RUN POSTS, INCLUDING A RUN THAT WORKED, and that is the part worth defending.
    ///
    /// Posting only on failure would have left the third question unanswerable, and on 2026-09-02
    /// it was the question nobody could answer: Alan's readings ended 2026-08-23, and no instrument
    /// anywhere could tell a run that failed from a run that never happened. Nothing schedules this
    /// intent — no background mode is registered and the automation lives on the phone — so "it was
    /// never invoked" is a live reading of any silence, and it looks exactly like every other one.
    /// A notice posted on every run carries iOS's own delivery time, so WHEN it last ran is legible
    /// on the phone whether it worked or not, and an entry from ten days ago says the thing no
    /// amount of server-side looking could say.
    ///
    /// ONE FIXED IDENTIFIER, so each run replaces the last notice rather than adding a tenth beside
    /// it. There is exactly one of these on the phone and it is always the newest.
    ///
    /// Authorization is deliberately NOT requested here. Asking from a background run presents
    /// nothing and decides nothing, and the app already asks on its own account. Where it was never
    /// granted, this posts into the dark — a smaller silence than the one it replaces, and the one
    /// part of this the intent cannot close from inside itself.
    ///
    /// Awaited rather than fired and forgotten: a headless run ends the moment it returns, and the
    /// notice is the whole point of the run that had nothing else to show for itself.
    ///
    /// Returns what it was handed, so the text Alan reads and the text the run returns cannot part.
    private static func announce(_ outcome: String) async -> String {
        NSLog("[health-samples] \(outcome)")
        let content = UNMutableNotificationContent()
        content.title = "Health sync"
        content.body = outcome
        do {
            try await UNUserNotificationCenter.current().add(
                UNNotificationRequest(
                    identifier: "healthSamples.lastRun", content: content, trigger: nil))
        } catch {
            NSLog("[health-samples] the notice could not be posted: \(error.localizedDescription)")
        }
        return outcome
    }

    func perform() async throws -> some IntentResult & ReturnsValue<String> {
        guard HKHealthStore.isHealthDataAvailable() else {
            return .result(
                value: await StreamHealthSamplesIntent.announce(
                    "Health data is not available on this device — nothing sent."))
        }
        let resolved = StreamHealthSamplesIntent.metrics.compactMap {
            metric -> (Metric, HKQuantityType)? in
            guard let type = HKQuantityType.quantityType(forIdentifier: metric.identifier) else {
                return nil
            }
            return (metric, type)
        }
        guard !resolved.isEmpty else {
            return .result(
                value: await StreamHealthSamplesIntent.announce(
                    "Neither metric is available on this device — nothing sent."))
        }

        // READ-ONLY, AND `toShare: []` IS NOW THE ONLY THING ENFORCING IT. Until #15990 there
        // were two independent barriers: this empty set, and a manifest with no
        // NSHealthUpdateUsageDescription — which made any write request FATAL rather than merely
        // denied. App Store validation forced that key in (it keys on the entitlement, not on
        // which APIs we call), so the structural barrier is gone and the guarantee is now
        // behavioural. Do NOT add a type to this set. `check-healthkit-read-only` pins EVERY
        // requestAuthorization call in this seam empty, and it is the only thing that can catch
        // a regression on Alan's health data.
        //
        // Requesting cannot present a sheet from a background run, and a throw here is NOT
        // fatal: the request is what registers the app under Health > Sharing > Apps, which is
        // where read access is granted by hand. The queries below simply find nothing until it
        // is — HealthKit makes a denied read indistinguishable from an empty one on purpose.
        // The upcast is written out rather than left to inference: `[HKQuantityType]` reaching a
        // `Set<HKObjectType>` needs an array covariance conversion, and there is no Swift
        // compiler on the machine this seam is authored on to find out that it did not infer.
        let readTypes: Set<HKObjectType> = Set(resolved.map { $0.1 as HKObjectType })
        let store = HKHealthStore()
        try? await store.requestAuthorization(toShare: [], read: readTypes)

        // Read once for the whole run rather than per metric: a headless intent holds no session
        // and so has no user id to query the Keychain with, and readSecret() is service-only.
        //
        // THIS BRANCH ENDS THE RUN BEFORE A SINGLE REQUEST IS MADE, so it leaves no line in any log
        // off this device and no arrival for anything to count. It is the reason `announce` exists:
        // from every side but the phone's, this branch and a phone that was never picked up are the
        // same reading.
        guard let secret = DeviceSecretKeychain.readSecret() else {
            return .result(
                value: await StreamHealthSamplesIntent.announce(
                    "No usable device credential on this device — open the app and sign in once, then run this again. Nothing sent."
                ))
        }

        // Before any query, and exactly once per device per generation. See `stateGeneration`:
        // this is what drops a cursor an earlier build advanced past samples it never sent.
        StreamHealthSamplesIntent.resetStateIfNeeded()

        // One line per metric, joined. Each is decided on its own, so a metric that fails or is
        // unauthorized must not suppress the other.
        var lines: [String] = []
        for (metric, quantityType) in resolved {
            lines.append(
                await StreamHealthSamplesIntent.stream(
                    store: store, metric: metric, quantityType: quantityType, secret: secret))
        }
        // Announced whatever it says. `stream` hands back prose rather than an outcome, so nothing
        // here can tell a run whose every batch was turned away at the route — a dead credential
        // store answers 500 on each one — from a run that sent everything. Reading the two apart
        // in code needs `stream` and `sweep` to report a shape, which is a change to the drain and
        // to the backstop rather than to this file. Alan reads them apart on sight, which is the
        // whole of what this had to buy back today.
        return .result(
            value: await StreamHealthSamplesIntent.announce(lines.joined(separator: " ")))
    }
SWIFT_HEALTH_SAMPLES
