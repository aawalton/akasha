#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'
    /// One page of new-or-changed samples plus the anchor that follows them. A `nil` anchor back
    /// means the query ERRORED.
    ///
    /// AN UNAUTHORIZED READ IS NOT THAT CASE, and reading it as though it were is what cost this
    /// row a build. HealthKit hides read-authorization state on purpose so an app cannot infer
    /// that a user declined, which it does by answering a refused read the way it answers a
    /// genuinely empty one: an EMPTY ARRAY, a VALID ANCHOR and NO ERROR. So a nil anchor is a
    /// failure, and a non-nil anchor with no samples is `nothing new` OR `not allowed to look`,
    /// with nothing here able to part them. `sweep` is what parts them, by looking again without
    /// a cursor and reporting both readings.
    ///
    /// The results handler fires exactly once when no `updateHandler` is set, so the
    /// continuation needs no resume guard. Deleted objects are ignored: the store this feeds
    /// only ever inserts, and a deletion in Health is not a fact it can carry.
    private static func runAnchoredQuery(
        store: HKHealthStore, quantityType: HKQuantityType, predicate: NSPredicate?,
        anchor: HKQueryAnchor?
    ) async -> ([HKQuantitySample], HKQueryAnchor?) {
        await withCheckedContinuation {
            (continuation: CheckedContinuation<([HKQuantitySample], HKQueryAnchor?), Never>) in
            let query = HKAnchoredObjectQuery(
                type: quantityType,
                predicate: predicate,
                anchor: anchor,
                limit: batchLimit
            ) { executed, samples, _, newAnchor, _ in
                store.stop(executed)
                continuation.resume(
                    returning: (samples?.compactMap { $0 as? HKQuantitySample } ?? [], newAnchor))
            }
            store.execute(query)
        }
    }

SWIFT_HEALTH_SAMPLES
