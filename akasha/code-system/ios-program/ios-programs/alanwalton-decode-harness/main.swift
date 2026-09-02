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

print(failures == 0 ? "\nOK — \(assertions) assertions passed" : "\n\(failures) of \(assertions) assertions failed")
exit(failures == 0 ? 0 : 1)
