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
    ) async -> ([HKQuantitySample], HKQueryAnchor?, Error?) {
        await withCheckedContinuation {
            (continuation: CheckedContinuation<([HKQuantitySample], HKQueryAnchor?, Error?), Never>) in
            let query = HKAnchoredObjectQuery(
                type: quantityType,
                predicate: predicate,
                anchor: anchor,
                limit: batchLimit
            ) { executed, samples, _, newAnchor, error in
                store.stop(executed)
                continuation.resume(
                    returning: (
                        samples?.compactMap { $0 as? HKQuantitySample } ?? [], newAnchor, error
                    ))
            }
            store.execute(query)
        }
    }

    /// Why a read that errored could not be run, as the notice says it.
    ///
    /// THE LOCKED PHONE IS `errorDatabaseInaccessible`. HealthKit's store is encrypted and shut
    /// while the phone is locked, and no app can open it. An automation that fires overnight
    /// reaches exactly this, and the sentence this replaced called it a permissions problem and
    /// sent the reader to a settings screen that was already right. Nothing else here can tell
    /// those two apart, so the error code is the only thing that ever could.
    ///
    /// Every other code is named by its number rather than guessed at, because a wrong guess is
    /// what cost this its last diagnosis.
    private static func whyUnread(_ error: Error?) -> String {
        if let error = error as? HKError, error.code == .errorDatabaseInaccessible {
            return
                "Health's store was shut — nothing sent. A locked phone reads exactly this way, so a run that fires while the phone is locked cannot get past it."
        }
        if let error = error as? HKError {
            return
                "could not be read from Health (error \(error.code.rawValue)) — nothing sent. If this repeats, allow it under Health > Sharing > Apps."
        }
        return
            "could not be read from Health — nothing sent. If this repeats, allow it under Health > Sharing > Apps."
    }

SWIFT_HEALTH_SAMPLES
