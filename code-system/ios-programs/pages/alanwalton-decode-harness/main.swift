import Foundation

var failures = 0

var assertions = 0

func check(_ name: String, _ passed: Bool, _ detail: String) {
    print(passed ? "PASS" : "FAIL", "—", name, "—", detail)
    assertions += 1
    if !passed { failures += 1 }
}

func decodeUsage(_ json: String) throws -> ClaudeUsage {
    try JSONDecoder().decode(ClaudeUsage.self, from: Data(json.utf8))
}

func threw(_ json: String) -> Bool {
    do {
        _ = try decodeUsage(json)
        return false
    } catch {
        return true
    }
}

let oldShape = #"{"avgUsedPct":54,"nextResetHours":94,"tier":"blue"}"#
check("a body of the old shape is rejected", threw(oldShape), "the cached pre-change body")

let newShape = #"""
{"avgUsedPct":54,"fiveHourBackAt":null,"sevenDayBackAt":1754236799832,"sevenDayEndsAt":1754496000655,"tier":"blue"}
"""#
do {
    let usage = try decodeUsage(newShape)
    let ok =
        usage.avgUsedPct == 54
        && usage.fiveHourBackAt == nil
        && usage.sevenDayBackAt == 1_754_236_799_832
        && usage.sevenDayEndsAt == 1_754_496_000_655
        && usage.tier == .blue
    check("a well-formed body decodes to its values", ok, "\(usage)")
} catch {
    check("a well-formed body decodes to its values", false, "threw: \(error)")
}

let badType = #"""
{"avgUsedPct":"fifty-four","fiveHourBackAt":null,"sevenDayBackAt":null,"sevenDayEndsAt":null,"tier":"blue"}
"""#
check("a non-integer avgUsedPct is rejected", threw(badType), "threw before this change too")

let reference = Date(timeIntervalSince1970: 1_785_000_000)
func countdown(secondsFromNow: Double) -> String {
    let instant = Int((reference.timeIntervalSince1970 + secondsFromNow) * 1000)
    return ClaudeUsage.countdown(to: instant, from: reference)
}

let spellings: [(String, String, String)] = [
    ("a null row reads none", ClaudeUsage.countdown(to: nil, from: reference), "none"),
    ("an instant already passed reads none", countdown(secondsFromNow: -1), "none"),
    ("an instant exactly now reads none", countdown(secondsFromNow: 0), "none"),
    ("26 hours reads 26h", countdown(secondsFromNow: 26 * 3600), "26h"),
    ("one hour exactly reads 1h", countdown(secondsFromNow: 3600), "1h"),
    ("just under an hour falls to minutes", countdown(secondsFromNow: 3599), "59m"),
    ("47 minutes reads 47m", countdown(secondsFromNow: 47 * 60), "47m"),
    ("just under a minute floors UP to 1m", countdown(secondsFromNow: 59), "1m"),
    ("one second still reads 1m", countdown(secondsFromNow: 1), "1m"),
]
for (name, got, want) in spellings {
    check(name, got == want, "got \(got), want \(want)")
}

private func acceptInt(_ body: Data) -> Int? {
    Int(String(data: body, encoding: .utf8) ?? "")
}

private let goodCache = Data("7".utf8)
private let freshBody = Data("9".utf8)
private let junk = Data("not-a-number".utf8)

private func describe(_ state: FeedState<Int>) -> String {
    switch state {
    case .loaded(let value): return "loaded(\(value))"
    case .neverLoaded: return "neverLoaded"
    case .refused: return "refused"
    }
}

private func isRefused(_ state: FeedState<Int>) -> Bool {
    if case .refused = state { return true }
    return false
}

private func loadedValue(_ state: FeedState<Int>) -> Int? {
    if case .loaded(let value) = state { return value }
    return nil
}

let refusedOverCache = FeedResolution.resolve(
    outcome: .refused, cached: goodCache, decode: acceptInt)
check(
    "a refusal does not fall back to a good cache",
    isRefused(refusedOverCache.state),
    describe(refusedOverCache.state))
check(
    "a refusal writes nothing to the cache",
    refusedOverCache.cacheWrite == nil,
    "cacheWrite \(refusedOverCache.cacheWrite == nil ? "nil" : "set")")

let refusedCold = FeedResolution.resolve(outcome: .refused, cached: nil, decode: acceptInt)
check(
    "a refusal on a cold widget is refused rather than never-read",
    isRefused(refusedCold.state),
    describe(refusedCold.state))

let unreachableOverCache = FeedResolution.resolve(
    outcome: .unreachable, cached: goodCache, decode: acceptInt)
check(
    "an unreachable endpoint still falls back to the cache",
    loadedValue(unreachableOverCache.state) == 7,
    describe(unreachableOverCache.state))

let unreachableCold = FeedResolution.resolve(
    outcome: .unreachable, cached: nil, decode: acceptInt)
check(
    "an unreachable endpoint with no cache has never loaded",
    describe(unreachableCold.state) == "neverLoaded",
    describe(unreachableCold.state))

let fetched = FeedResolution.resolve(outcome: .body(freshBody), cached: goodCache, decode: acceptInt)
check(
    "a fetched body wins over the cache",
    loadedValue(fetched.state) == 9,
    describe(fetched.state))
check(
    "a fetched body that decoded is what gets cached",
    fetched.cacheWrite == freshBody,
    "cacheWrite \(fetched.cacheWrite.map { String(data: $0, encoding: .utf8) ?? "?" } ?? "nil")")

let undecodable = FeedResolution.resolve(outcome: .body(junk), cached: goodCache, decode: acceptInt)
check(
    "a 200 that will not decode falls back to the cache",
    loadedValue(undecodable.state) == 7,
    describe(undecodable.state))
check(
    "a 200 that will not decode is never cached",
    undecodable.cacheWrite == nil,
    "cacheWrite \(undecodable.cacheWrite == nil ? "nil" : "set")")

let staleShape = FeedResolution.resolve(outcome: .unreachable, cached: junk, decode: acceptInt)
check(
    "a cache that no longer decodes is not drawn",
    describe(staleShape.state) == "neverLoaded",
    describe(staleShape.state))

func stoplightsBody(_ key: String, _ slugs: [String]) -> String {
    let entries = slugs.map { #"{"\#(key)":"\#($0)","tier":"green"}"# }.joined(separator: ",")
    return #"{"stoplights":[\#(entries)]}"#
}

func decodedCount<Payload: Decodable>(
    _ type: Payload.Type, _ json: String, _ count: (Payload) -> Int
) -> Int? {
    guard let payload = try? JSONDecoder().decode(type, from: Data(json.utf8)) else { return nil }
    return count(payload)
}

func upkeepCount(_ slugs: [String]) -> Int? {
    decodedCount(UpkeepStoplightsResponse.self, stoplightsBody("habit", slugs)) {
        $0.stoplights.count
    }
}

func inboxCount(_ slugs: [String]) -> Int? {
    decodedCount(InboxStoplightsResponse.self, stoplightsBody("inbox", slugs)) {
        $0.stoplights.count
    }
}

check(
    "a seventh upkeep circle decodes",
    upkeepCount(["plants", "activity", "sleep", "hygiene", "capacity", "safety", "meds"]) == 7,
    "seven entries")
check(
    "three inbox circles decode",
    inboxCount(["email", "tasks", "temperTasks"]) == 3,
    "three entries")

check("an empty upkeep payload is rejected", upkeepCount([]) == nil, "no stoplights")
check("an empty inbox payload is rejected", inboxCount([]) == nil, "no stoplights")

check(
    "an entry naming the wrong key is rejected",
    decodedCount(UpkeepStoplightsResponse.self, stoplightsBody("value", ["plants"])) {
        $0.stoplights.count
    } == nil,
    "a values entry offered to the upkeep decoder")

func decodeCost(_ body: Data) -> CostResponse? {
    try? JSONDecoder().decode(CostResponse.self, from: body)
}

func decodeSurplus(_ body: Data) -> SurplusResponse? {
    try? JSONDecoder().decode(SurplusResponse.self, from: body)
}

func costState(_ json: String) -> FeedState<CostResponse> {
    guard let payload = decodeCost(Data(json.utf8)) else { return .neverLoaded }
    return .loaded(payload)
}

func surplusState(_ json: String) -> FeedState<SurplusResponse> {
    guard let payload = decodeSurplus(Data(json.utf8)) else { return .neverLoaded }
    return .loaded(payload)
}

func costPayload(_ tier: String, _ figure: String) -> String {
    #"{"stoplights":[{"tier":"\#(tier)","reading":"\#(figure)","label":"Cost"}]}"#
}

let costAtZero = costReading(costState(costPayload("green", "0.00")))
check(
    "a cost of zero is drawn rather than hidden",
    costAtZero?.reading == "0.00" && costAtZero?.tier == .green,
    String(describing: costAtZero))

let blackCostBody = costPayload("black", "1.40")
let costPastOne = costReading(costState(blackCostBody))
check(
    "a cost past one keeps its figure at black",
    costPastOne?.reading == "1.40" && costPastOne?.tier == .black,
    String(describing: costPastOne))
check(
    "the black reading the surplus tile hides is the one the cost tile draws",
    surplusReading(surplusState(blackCostBody)) == nil && costPastOne != nil,
    String(describing: surplusReading(surplusState(blackCostBody))))

check(
    "a cost carrying an empty figure is drawn as no signal",
    costReading(costState(costPayload("black", ""))) == nil,
    "an empty reading")

let costWithoutFigure = #"{"stoplights":[{"tier":"green","label":"Cost"}]}"#
check(
    "a cost carrying no figure at all is drawn as no signal",
    costReading(costState(costWithoutFigure)) == nil,
    "no reading at all")

check(
    "an empty cost payload is rejected",
    decodeCost(Data(#"{"stoplights":[]}"#.utf8)) == nil,
    "no stoplights")

check(
    "a cost never carried in reads nothing",
    costReading(FeedState<CostResponse>.neverLoaded) == nil,
    "neverLoaded")
check(
    "a refused cost reads nothing",
    costReading(FeedState<CostResponse>.refused) == nil,
    "refused")

let staleCost = FeedResolution.resolve(
    outcome: .unreachable, cached: Data(#"{"stoplights":[]}"#.utf8), decode: decodeCost)
check(
    "a cost cache that no longer decodes is not drawn",
    costReading(staleCost.state) == nil,
    "neverLoaded")

check(
    "a cost caption is the label the feed sent",
    costCaption(costState(costPayload("green", "0.00"))) == "Cost",
    String(describing: costCaption(costState(costPayload("green", "0.00")))))

let TOOK_AT = "2026-09-10T16:00:00.000Z"

let fallInstant: ISO8601DateFormatter = {
    let read = ISO8601DateFormatter()
    read.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return read
}()

let tookAt = fallInstant.date(from: TOOK_AT) ?? Date()

let FALLS = #","takenAt":"\#(TOOK_AT)","fallsPerHour":1"#

let RESTS = #","takenAt":"\#(TOOK_AT)","fallsPerHour":0"#

func fallingBody(_ figure: String, _ extra: String) -> String {
    #"{"stoplights":[{"habit":"surplus","tier":"green","label":"Surplus","reading":"\#(figure)"\#(extra)}]}"#
}

func fallingSurplus(_ extra: String, _ figure: String = "9.5") -> HabitStoplight? {
    decodeSurplus(Data(fallingBody(figure, extra).utf8))?.surplus
}

func fallingUpkeep(_ extra: String) -> UpkeepStoplight? {
    let body = Data(fallingBody("9.5", extra).utf8)
    return (try? JSONDecoder().decode(UpkeepStoplightsResponse.self, from: body))?.stoplights.first
}

func drawnAfter(_ minutes: Double, _ extra: String, _ figure: String = "9.5") -> String? {
    fallingSurplus(extra, figure)?.figure(asOf: tookAt.addingTimeInterval(minutes * 60))
}

check(
    "a stoplight saying it falls with the clock decodes with its moment and its rate",
    fallingSurplus(FALLS)?.takenAt == TOOK_AT && fallingSurplus(FALLS)?.fallsPerHour == 1
        && fallingUpkeep(FALLS)?.fallsPerHour == 1,
    String(describing: fallingSurplus(FALLS)))
check(
    "a stoplight saying it falls at nothing an hour decodes",
    fallingSurplus(RESTS)?.fallsPerHour == 0 && fallingUpkeep(RESTS)?.fallsPerHour == 0,
    "a rate of nothing")
check(
    "a stoplight saying nothing of falling decodes carrying neither",
    fallingSurplus("")?.takenAt == nil && fallingSurplus("")?.fallsPerHour == nil
        && fallingUpkeep("")?.fallsPerHour == nil,
    "neither key sent")

let fallSpellings: [(String, String?, String)] = [
    ("a falling reading at the moment taken is the figure sent", drawnAfter(0, FALLS), "9.5"),
    ("half an hour on has half an hour off it", drawnAfter(30, FALLS), "9"),
    ("an hour on has an hour off it", drawnAfter(60, FALLS), "8.5"),
    ("a reading falling at nothing an hour is drawn as sent", drawnAfter(60, RESTS), "9.5"),
    ("a reading saying nothing of falling is drawn as sent", drawnAfter(60, ""), "9.5"),
    ("a falling reading is drawn below zero rather than held there", drawnAfter(180, FALLS, "0.5"), "-2.5"),
    ("a moment later than now takes nothing off the reading", drawnAfter(-60, FALLS), "9.5"),
    (
        "a reading falling twice as fast falls twice as far",
        FallingReading.figure(
            reading: "9.5", takenAt: TOOK_AT, fallsPerHour: 2,
            now: tookAt.addingTimeInterval(1800)),
        "8.5"
    ),
    (
        "a moment that is no instant leaves the reading as sent",
        FallingReading.figure(reading: "9.5", takenAt: "never", fallsPerHour: 1, now: tookAt),
        "9.5"
    ),
    (
        "an empty figure is left empty rather than read as a number",
        FallingReading.figure(
            reading: "", takenAt: TOOK_AT, fallsPerHour: 1,
            now: tookAt.addingTimeInterval(3600)),
        ""
    ),
]
for (name, drew, want) in fallSpellings {
    check(name, drew == want, "got \(String(describing: drew)), want \(want)")
}

check(
    "a stoplight carrying no figure is left carrying none",
    FallingReading.figure(reading: nil, takenAt: TOOK_AT, fallsPerHour: 1, now: tookAt) == nil,
    "no figure at all")
check(
    "an instant with no fractional seconds is read too",
    FallingReading.hoursSince("2026-09-10T16:00:00Z", tookAt.addingTimeInterval(3600)) == 1,
    "a plain instant")

print(failures == 0 ? "\nOK — \(assertions) assertions passed" : "\n\(failures) of \(assertions) assertions failed")
exit(failures == 0 ? 0 : 1)
