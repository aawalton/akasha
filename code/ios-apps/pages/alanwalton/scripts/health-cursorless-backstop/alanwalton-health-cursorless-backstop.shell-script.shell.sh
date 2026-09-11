#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'
    /// The backstop: the one read in this intent that trusts NO stored state.
    ///
    /// It runs where the anchored drain sent nothing, which is the exact shape of the failure
    /// this generation repairs — on 2026-08-09 the drain reported `nothing new to send` for
    /// active energy while Health held three days of calories for Alan to read off his own
    /// screen. A plain window query has no cursor that can be wrong and no state to be poisoned,
    /// so what it finds is what HealthKit will actually hand this app right now. Whatever it
    /// finds is sent: the route's row identity is the metric, the source and the two instants
    /// under ON CONFLICT DO UPDATE, so a sample already stored costs a comparison and changes
    /// nothing, and a full re-import of Alan's history inserted 0 rows against the live table.
    ///
    /// IT DOES NOT REPLACE THE ANCHOR, and the two are here because they fail independently. The
    /// anchor is what makes an outage LONGER than this window recoverable, and it is also the
    /// only one of the two that catches a sample inserted today carrying a start instant from
    /// last week — a watch syncing late does exactly that, and no date window can see it.
    private static func sweep(
        store: HKHealthStore, metric: Metric, quantityType: HKQuantityType, secret: String
    ) async -> String {
        let window = "the last \(Int(seedWindowSeconds) / 3600) hours"
        guard
            let samples = await runWindowQuery(
                store: store, quantityType: quantityType, start: seedStart())
        else {
            return
                "\(metric.wireName): nothing new since the last send, and a direct read of \(window) could not be run."
        }
        if samples.isEmpty {
            // BOTH reads came back empty. That is a genuinely quiet window OR a read this app is
            // not allowed to make, and those are the two the intent could never tell apart. It
            // still cannot — but it now reports WHICH PAIR OF READINGS it got, which is what
            // makes the difference askable instead of invisible.
            return
                "\(metric.wireName): nothing new to send, and a direct read of \(window) found no samples either."
        }

        var sentTotal = 0
        var insertedTotal = 0
        var posts = 0
        for start in stride(from: 0, to: samples.count, by: batchLimit) {
            // Same bound as the anchored path, for the same reason: a background run has to
            // terminate, and what this one does not reach the next one reads again from scratch,
            // because nothing here advances a cursor.
            if posts >= maxRoundsPerMetric { break }
            let batch = Array(samples[start..<min(start + batchLimit, samples.count)])
            switch await post(secret: secret, samples: batch.map { wire($0, as: metric) }) {
            case .failure(let reason):
                return
                    "\(metric.wireName): nothing new since the last send; a direct read of \(window) found \(samples.count) samples, and \(reason)"
            case .success(let report):
                sentTotal += batch.count
                insertedTotal += report.inserted
                posts += 1
            }
            try? await Task.sleep(nanoseconds: pauseBetweenPostsNanoseconds)
        }
        // `inserted` is what the SERVER had never seen. Above zero here says the anchored drain is
        // LOSING samples rather than finding none, and it is the only signal in this system that
        // says so from the device's own side.
        return
            "\(metric.wireName): nothing new since the last send, but a direct read of \(window) found \(samples.count) samples and sent \(sentTotal) in \(posts) batches — \(insertedTotal) the server had not seen."
    }

    /// One plain read of a date window — no anchor, no cursor, nothing persisted. `nil` back means
    /// the query ERRORED; an empty array back means HealthKit answered with nothing, which is the
    /// reading `sweep` reports rather than acts on.
    ///
    /// Sorted by start instant ascending so the batches go up in order and a run that stops
    /// part-way has sent a PREFIX rather than a scatter. `HKObjectQueryNoLimit` is bounded by the
    /// window rather than by a count, and the batching loop bounds what one run sends.
    private static func runWindowQuery(
        store: HKHealthStore, quantityType: HKQuantityType, start: Date
    ) async -> [HKQuantitySample]? {
        let predicate = HKQuery.predicateForSamples(
            withStart: start, end: nil, options: .strictStartDate)
        let sort = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: true)
        return await withCheckedContinuation {
            (continuation: CheckedContinuation<[HKQuantitySample]?, Never>) in
            let query = HKSampleQuery(
                sampleType: quantityType,
                predicate: predicate,
                limit: HKObjectQueryNoLimit,
                sortDescriptors: [sort]
            ) { _, samples, error in
                guard error == nil, let samples else {
                    continuation.resume(returning: nil)
                    return
                }
                continuation.resume(returning: samples.compactMap { $0 as? HKQuantitySample })
            }
            store.execute(query)
        }
    }

SWIFT_HEALTH_SAMPLES
