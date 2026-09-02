#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'

// ===== stream-health-samples app intent seam ================================
// Streams RAW HealthKit samples — active energy and step count — to the fleet's batched
// health-samples route, with no app session and without opening the app. Each sample goes up
// carrying its OWN start and end instants and its OWN value, so nothing on this device decides
// what a day is; the server holds rows and every window is a query over them.
//
// WHAT MAKES A MISSED RUN RECOVERABLE, which is this intent's hardest requirement.
// HKAnchoredObjectQuery plus a per-metric HKQueryAnchor persisted across runs. The anchor is
// what "the last acknowledged send" means, and it advances ONLY after the server has answered
// 200 — so a run that dies offline, without a credential, or on a non-200 leaves the anchor
// exactly where it was and the next run fetches the same samples again. Nothing here is derived
// from the firing instant. #17551 lost six days because a one-day window was correct only on
// one side of a boundary that moves with DST and with travel, and a headless run returns its
// String to nobody, so nobody saw it.
//
// AND WHY THERE ARE TWO READS RATHER THAN ONE. The anchor above is a cursor, and a cursor can be
// wrong in the one way that costs everything: HealthKit answers a read it will not allow exactly
// as it answers a quiet day — an empty page, a valid anchor, no error — so the first build of
// this intent acknowledged an empty page it should have doubted, advanced the cursor past three
// days of Alan's calories, and reported `nothing new to send` in a voice indistinguishable from
// success. So where the anchored drain sends nothing for a metric, `sweep` reads the same recent
// window again with NO cursor at all and sends what it finds. The route deduplicates on the
// sample's own identity, so the second read costs a comparison where the first was right, and
// recovers the window where it was wrong. The two disagreeing is the diagnosis, and the returned
// line now says which pair of readings it got.
//
// Authenticates with the per-device `dvs_v1_…` credential the sign-in hook stored in the
// Keychain (see the device-secret seam below), presented in its own X-Device-Secret header.
@available(iOS 16.0, *)
struct StreamHealthSamplesIntent: AppIntent {
    static var title: LocalizedStringResource = "Stream Health Samples"
    // Every literal on this struct reaches the App Store upload validator, which rejects one
    // brand substring case-insensitively (ITMS-90626) ~40 seconds AFTER accepting the upload,
    // having already burned a build number — build 157 died on exactly this construct.
    // `check-app-intent-brand-words` extracts title, shortTitle, IntentDescription and phrases
    // and is what catches it before an upload rather than after one.
    static var description = IntentDescription(
        "Sends new Health active energy and step samples to alanwalton.com, each with its own start and end times rather than as a daily total. Runs without opening the app, resumes wherever the last successful run stopped, and returns a one-line summary of what happened."
    )
    // Never launch the app — running unattended is this intent's whole purpose.
    static var openAppWhenRun: Bool = false

    private static let endpoint = URL(
        string: "https://alanwalton.com/api/tracking/health-samples")!

    /// One POST. The route refuses a batch over 1000 outright, so this sits well under that
    /// rather than at the edge of it.
    private static let batchLimit = 500

    /// How many batches one metric may send in a single run. A background run has to terminate,
    /// and what it does not reach is NOT lost: the anchor advanced after each acknowledged POST,
    /// so the next run resumes from there. This is a bound on one run, never on what is sent.
    private static let maxRoundsPerMetric = 10

    /// Pause between POSTs, so a run that does have a backlog trickles rather than bursts.
    private static let pauseBetweenPostsNanoseconds: UInt64 = 300_000_000

    /// How far back the FIRST run on a device reaches, and it exists for one reason: an anchored
    /// query with no anchor returns EVERY matching sample HealthKit holds, which for a phone
    /// carried for years is years. This build is not the historical import — that reads an
    /// exported archive on the workstation and owns everything older than this floor — so the
    /// first run needs a bound, and this is the smallest one that still covers a full day either
    /// side of whenever it happens to fire.
    private static let seedWindowSeconds: TimeInterval = 48 * 60 * 60

    /// One streamed metric: what HealthKit calls it, what the route calls it, the unit both
    /// agree on, and where this device keeps its anchor and its floor.
    private struct Metric {
        let wireName: String
        let identifier: HKQuantityTypeIdentifier
        let unit: HKUnit
        /// The route checks this against `wireName` and 400s the batch on a mismatch, because
        /// the other sender into that table reads its unit out of an export that spells the
        /// same unit differently. It is a unit rule, never a day rule.
        let wireUnit: String
        let anchorKey: String
        /// Written by generation 1 and now read by nothing. It survives on this struct only so
        /// the reset can remove it from a device that already carries one — see `seedStart()`
        /// for why a PERSISTED floor is gone rather than merely cleared.
        let legacyFloorKey: String
    }

    private static let metrics: [Metric] = [
        Metric(
            wireName: "activeEnergy", identifier: .activeEnergyBurned, unit: .kilocalorie(),
            wireUnit: "kcal",
            anchorKey: "healthSamples.anchor.activeEnergy",
            legacyFloorKey: "healthSamples.floor.activeEnergy"),
        Metric(
            wireName: "stepCount", identifier: .stepCount, unit: .count(),
            wireUnit: "count",
            anchorKey: "healthSamples.anchor.stepCount",
            legacyFloorKey: "healthSamples.floor.stepCount"),
    ]

    /// The generation of on-device state this build trusts. Where the number stored on the device
    /// is behind it, every anchor and every legacy floor is dropped before the run's first query
    /// and the number is brought forward.
    ///
    /// GENERATION 2 EXISTS BECAUSE GENERATION 1 COULD ADVANCE AN ANCHOR PAST SAMPLES IT NEVER
    /// SENT. Its empty-page branch wrote the anchor, and an empty page is not evidence that
    /// nothing is there — an unauthorized read returns exactly that shape. On 2026-08-09 Alan's
    /// phone reported `activeEnergy: nothing new to send` while Health held three days of
    /// calories, and those samples sit behind a cursor no later run can reach back past.
    /// Repairing the branch WITHOUT dropping the cursor would ship a build that passes every
    /// check here and still streams nothing, because what it would send is already behind the
    /// anchor. The reset is therefore part of the change rather than something to do to the
    /// device afterwards.
    ///
    /// Both metrics are reset rather than the one observed broken: it costs a re-send of the seed
    /// window for steps, which the route collapses onto rows it already holds, and it buys one
    /// code path instead of a special case naming a metric.
    private static let stateGeneration = 2
    private static let stateGenerationKey = "healthSamples.stateGeneration"
SWIFT_HEALTH_SAMPLES
