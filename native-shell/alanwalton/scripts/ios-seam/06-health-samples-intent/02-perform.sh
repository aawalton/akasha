#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'

    func perform() async throws -> some IntentResult & ReturnsValue<String> {
        guard HKHealthStore.isHealthDataAvailable() else {
            return .result(value: "Health data is not available on this device — nothing sent.")
        }
        let resolved = StreamHealthSamplesIntent.metrics.compactMap {
            metric -> (Metric, HKQuantityType)? in
            guard let type = HKQuantityType.quantityType(forIdentifier: metric.identifier) else {
                return nil
            }
            return (metric, type)
        }
        guard !resolved.isEmpty else {
            return .result(value: "Neither metric is available on this device — nothing sent.")
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
        guard let secret = DeviceSecretKeychain.readSecret() else {
            return .result(
                value:
                    "No usable device credential on this device — open the app and sign in once, then run this again. Nothing sent."
            )
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
        return .result(value: lines.joined(separator: " "))
    }
SWIFT_HEALTH_SAMPLES
