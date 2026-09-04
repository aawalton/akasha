import Foundation

var failures = 0

var assertions = 0

func check(_ name: String, _ passed: Bool, _ detail: String) {
    print(passed ? "PASS" : "FAIL", "—", name, "—", detail)
    assertions += 1
    if !passed { failures += 1 }
}

func decodeCounts(_ json: String) throws -> Categorization {
    try JSONDecoder().decode(Categorization.self, from: Data(json.utf8))
}

func countsThrew(_ json: String) -> Bool {
    do {
        _ = try decodeCounts(json)
        return false
    } catch {
        return true
    }
}

do {
    let counts = try decodeCounts(#"{"unreviewed":19}"#)
    check(
        "a well-formed body decodes to its values",
        counts.unreviewed == 19,
        "unreviewed \(counts.unreviewed)")
} catch {
    check("a well-formed body decodes to its values", false, "threw: \(error)")
}

check(
    "a body missing unreviewed is rejected rather than read as zero",
    countsThrew(#"{"noneLeftWords":"All reviewed!"}"#),
    "unreviewed absent")

check(
    "a body carrying the pre-#18176 uncategorized key is rejected",
    countsThrew(#"{"uncategorized":19}"#),
    "the old spelling")

check(
    "a non-integer count is rejected",
    countsThrew(#"{"unreviewed":"nineteen"}"#),
    "unreviewed as a string")

do {
    let zero = try decodeCounts(#"{"unreviewed":0}"#)
    check(
        "a 200 carrying a zero count decodes rather than failing",
        zero.unreviewed == 0,
        "unreviewed \(zero.unreviewed)")
} catch {
    check("a 200 carrying a zero count decodes rather than failing", false, "threw: \(error)")
}

private func describeOutcome(_ outcome: FetchOutcome) -> String {
    switch outcome {
    case .body(let data): return "body(\(String(data: data, encoding: .utf8) ?? "?"))"
    case .refused: return "refused"
    case .unreachable: return "unreachable"
    }
}

private let servedBody = Data(#"{"unreviewed":19}"#.utf8)

check(
    "a 200 is the body it carried",
    describeOutcome(FetchOutcome.forStatus(200, body: servedBody)).hasPrefix("body("),
    describeOutcome(FetchOutcome.forStatus(200, body: servedBody)))
check(
    "a 401 is a refusal",
    describeOutcome(FetchOutcome.forStatus(401, body: Data())) == "refused",
    describeOutcome(FetchOutcome.forStatus(401, body: Data())))
check(
    "a 503 is unreachable rather than a refusal",
    describeOutcome(FetchOutcome.forStatus(503, body: Data())) == "unreachable",
    describeOutcome(FetchOutcome.forStatus(503, body: Data())))
check(
    "a 500 is unreachable",
    describeOutcome(FetchOutcome.forStatus(500, body: Data())) == "unreachable",
    describeOutcome(FetchOutcome.forStatus(500, body: Data())))

check(
    "an unsubstituted placeholder is nothing to present",
    RingCredential.toPresent(RingCredential.baked) == nil,
    "baked value as committed")
check(
    "an empty credential is nothing to present",
    RingCredential.toPresent("") == nil,
    "empty string")
check(
    "a substituted credential is presented as it stands",
    RingCredential.toPresent("rc_live_9f2a4c8e") == "rc_live_9f2a4c8e",
    String(describing: RingCredential.toPresent("rc_live_9f2a4c8e")))
check(
    "the header is the one the route reads",
    RingCredential.header == "X-Ring-Credential",
    RingCredential.header)

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
    "the cached reading is not what a refused widget shows",
    loadedValue(refusedOverCache.state) == nil,
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
    "an unreachable feed still falls back to the cache",
    loadedValue(unreachableOverCache.state) == 7,
    describe(unreachableOverCache.state))

let noReadingOverCache = FeedResolution.resolve(
    outcome: FetchOutcome.forStatus(503, body: Data()), cached: goodCache, decode: acceptInt)
check(
    "a 503 falls back to the cache",
    loadedValue(noReadingOverCache.state) == 7,
    describe(noReadingOverCache.state))
let noReadingCold = FeedResolution.resolve(
    outcome: FetchOutcome.forStatus(503, body: Data()), cached: nil, decode: acceptInt)
check(
    "a 503 with no cache has never loaded",
    describe(noReadingCold.state) == "neverLoaded",
    describe(noReadingCold.state))

let fetched = FeedResolution.resolve(
    outcome: .body(freshBody), cached: goodCache, decode: acceptInt)
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
    "a malformed body falls back to the cache",
    loadedValue(undecodable.state) == 7,
    describe(undecodable.state))
check(
    "a malformed body is never written to the cache",
    undecodable.cacheWrite == nil,
    "cacheWrite \(undecodable.cacheWrite == nil ? "nil" : "set")")
let undecodableCold = FeedResolution.resolve(outcome: .body(junk), cached: nil, decode: acceptInt)
check(
    "a malformed body on a cold widget caches nothing and has never loaded",
    undecodableCold.cacheWrite == nil && describe(undecodableCold.state) == "neverLoaded",
    describe(undecodableCold.state))

let staleShape = FeedResolution.resolve(outcome: .unreachable, cached: junk, decode: acceptInt)
check(
    "a cache that no longer decodes is not drawn",
    describe(staleShape.state) == "neverLoaded",
    describe(staleShape.state))

print(failures == 0 ? "\nOK — \(assertions) assertions passed" : "\n\(failures) of \(assertions) assertions failed")
exit(failures == 0 ? 0 : 1)
