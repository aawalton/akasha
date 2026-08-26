#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'

    /// Drain one metric: fetch a page of new-or-changed samples, POST it, and advance the anchor
    /// only once the server has taken it. Returns the line perform() reports for that metric.
    private static func stream(
        store: HKHealthStore, metric: Metric, quantityType: HKQuantityType, secret: String
    ) async -> String {
        var anchor = readAnchor(for: metric)
        // NO ANCHOR means nothing bounds this run but the seed window, and without a bound an
        // anchored query returns every sample HealthKit holds. AN ANCHOR means the anchor is the
        // bound — that is its whole job — and a date predicate beside it could only subtract from
        // what it legitimately returns, which is exactly how a long outage would lose its samples
        // while looking like a safety rail.
        //
        // `.strictStartDate` matches a sample on the instant it STARTED, which is also the
        // instant the server keys its identity on — so what this query selects and what the
        // store deduplicates on are the same thing.
        let predicate: NSPredicate? =
            anchor == nil
            ? HKQuery.predicateForSamples(
                withStart: seedStart(), end: nil, options: .strictStartDate)
            : nil
        var sent = 0
        var posts = 0
        var valueChanged = 0

        for _ in 0..<maxRoundsPerMetric {
            let (samples, newAnchor) = await runAnchoredQuery(
                store: store, quantityType: quantityType, predicate: predicate, anchor: anchor)
            guard let newAnchor else {
                return
                    "\(metric.wireName): could not be read from Health — nothing sent. If this repeats, allow it under Health > Sharing > Apps."
            }
            if samples.isEmpty {
                // THE ANCHOR IS NOT WRITTEN HERE, and that is the repair generation 2 exists for.
                // An empty page is not evidence that nothing is there — an unauthorized read
                // returns precisely this shape, an empty array with a valid anchor and no error,
                // because HealthKit hides read-authorization state on purpose so an app cannot
                // infer that it was declined. Generation 1 wrote the anchor here, so one wrongly
                // empty page put every sample behind it permanently out of reach: the guarantee
                // this intent was built on held for a POST that failed and not for a READ that
                // came back wrongly empty.
                //
                // What the old write bought was skipping a re-examination of samples deleted in
                // Health, which this store does not track. That is a constant per-run cost rather
                // than a growing one, and it clears itself the moment a real sample is
                // acknowledged and the anchor moves past all of it. It is not worth a permanent
                // loss.
                break
            }

            let payload = samples.map { wire($0, as: metric) }
            switch await post(secret: secret, samples: payload) {
            case .failure(let reason):
                // The anchor is deliberately NOT advanced. Every sample in this batch is fetched
                // again by the next run, which is the whole of how a missed run recovers.
                let sofar = sent == 0 ? "" : "sent \(sent) samples in \(posts) batches, then "
                return
                    "\(metric.wireName): \(sofar)\(reason) Nothing from that point on is lost — the next run sends it again."
            case .success(let report):
                anchor = newAnchor
                writeAnchor(newAnchor, for: metric)
                sent += payload.count
                posts += 1
                valueChanged += report.valueChanged
            }

            // A short page means HealthKit had nothing more to give, so stop rather than spend a
            // round finding that out.
            if samples.count < batchLimit { break }
            try? await Task.sleep(nanoseconds: pauseBetweenPostsNanoseconds)
        }

        // Sending nothing is the shape of the failure this generation repairs, so it is never
        // reported on the anchored read's word alone — `sweep` goes and looks without a cursor.
        if sent == 0 {
            return await sweep(
                store: store, metric: metric, quantityType: quantityType, secret: secret)
        }
        var line = "Sent \(sent) \(metric.wireName) samples in \(posts) batches."
        if valueChanged > 0 {
            // Non-zero means the server found these identities already stored under a DIFFERENT
            // value — either a correction Health made after we first read the sample, or two
            // distinct samples colliding on the identity tuple. The second undercounts silently,
            // and surfacing the number here is what makes it possible to notice at all.
            line += " \(valueChanged) of them changed a value already stored — worth a look."
        }
        return line
    }

SWIFT_HEALTH_SAMPLES
