#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'
    // --- the two things this intent remembers ---------------------------------------------
    // UserDefaults rather than the Keychain: neither an anchor nor a floor is a secret, and
    // neither is worth anything to anyone else. The intent is declared in the App target, so a
    // headless run happens in the app's OWN process and reaches the app's own defaults.

    private static func readAnchor(for metric: Metric) -> HKQueryAnchor? {
        guard let data = UserDefaults.standard.data(forKey: metric.anchorKey) else { return nil }
        return try? NSKeyedUnarchiver.unarchivedObject(ofClass: HKQueryAnchor.self, from: data)
    }

    /// Called ONLY once the server has acknowledged the batch this anchor follows. Advancing it
    /// anywhere else is precisely what would turn a failed run into permanently lost samples.
    private static func writeAnchor(_ anchor: HKQueryAnchor, for metric: Metric) {
        guard
            let data = try? NSKeyedArchiver.archivedData(
                withRootObject: anchor, requiringSecureCoding: true)
        else { return }
        UserDefaults.standard.set(data, forKey: metric.anchorKey)
    }

    /// How far back a read reaches when it has NO anchor to bound it — a first run, a run after
    /// the reset above, and every sweep. Computed each time and PERSISTED NOWHERE.
    ///
    /// Generation 1 stored this instant on first use and never recomputed it, which is the half
    /// that had to go. A floor recomputed per run and applied to an ANCHORED read would discard
    /// exactly the samples an anchor legitimately returns after a long outage — that reasoning
    /// was right, and it is why the anchored path above applies no date predicate at all once it
    /// has an anchor. What the reasoning did not weigh is the cost of the other half: a floor
    /// seeded once at an instant nobody can read back is a permanent lower bound on everything
    /// the metric can ever reach, and no instrument on this device or off it can say what it is.
    /// Applying the window only where there is no anchor serves the case it was written for — an
    /// unanchored query returns every sample HealthKit holds, which for a phone carried for years
    /// is years — and leaves no state behind that can only ever subtract.
    private static func seedStart() -> Date {
        Date().addingTimeInterval(-seedWindowSeconds)
    }

    /// Drop every cursor this build cannot trust, once per device per generation.
    ///
    /// `integer(forKey:)` answers 0 for a key never written, which is the right answer for a
    /// device that has only ever run generation 1 — it wrote no generation at all. Removing an
    /// absent key is a no-op, so a fresh install takes this path harmlessly and writes the number.
    private static func resetStateIfNeeded() {
        let defaults = UserDefaults.standard
        guard defaults.integer(forKey: stateGenerationKey) < stateGeneration else { return }
        for metric in metrics {
            defaults.removeObject(forKey: metric.anchorKey)
            defaults.removeObject(forKey: metric.legacyFloorKey)
        }
        defaults.set(stateGeneration, forKey: stateGenerationKey)
    }
}
SWIFT_HEALTH_SAMPLES
