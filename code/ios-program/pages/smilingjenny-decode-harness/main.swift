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

func decodeStoplights(_ json: String) -> SafetyLevelResponse? {
    try? JSONDecoder().decode(SafetyLevelResponse.self, from: Data(json.utf8))
}

func stoplightsBody(_ slugs: [String]) -> String {
    let entries = slugs.map { #"{"habit":"\#($0)","tier":"green"}"# }.joined(separator: ",")
    return #"{"stoplights":[\#(entries)]}"#
}

func stoplightsCount(_ slugs: [String]) -> Int? {
    decodeStoplights(stoplightsBody(slugs))?.stoplights.count
}

check(
    "every stoplight a feed sends decodes",
    stoplightsCount(["connection", "safety"]) == 2,
    "two entries")
check("an empty stoplights payload is rejected", stoplightsCount([]) == nil, "no stoplights")

let stoplightFigureless = #"""
{"stoplights":[{"habit":"connection","label":"Connection","tier":"black","reading":"","readingHeld":"none"}]}
"""#
check(
    "a stoplight with no figure decodes rather than being rejected",
    decodeStoplights(stoplightFigureless)?.stoplights.first?.reading == "",
    "an empty figure beside readingHeld")

check(
    "a stoplight carrying a color the tile does not know is rejected",
    decodeStoplights(#"{"stoplights":[{"habit":"connection","tier":"purple"}]}"#) == nil,
    "an unknown tier")

check(
    "a stoplight keeps the label the feed sent",
    decodeStoplights(stoplightFigureless)?.stoplights.first?.label == "Connection",
    "the label off the readout's page")

func fallingStoplight(_ extra: String) -> HabitStoplight? {
    decodeStoplights(FallingChecks.body("9.5", extra))?.stoplights.first
}

for (name, held, saw) in ScaleChecks.run() { check(name, held, saw) }

for (name, held, saw) in FallingChecks.run() { check(name, held, saw) }

for (name, held, saw) in TimelineChecks.run() { check(name, held, saw) }

for (name, held, saw) in FreshnessChecks.run() { check(name, held, saw) }

check(
    "a stoplight saying it falls with the clock decodes with its rate",
    fallingStoplight(FallingChecks.FALLS)?.fallsPerHour == 1,
    "the rate the feed sent")
check(
    "a stoplight saying it falls at nothing an hour decodes",
    fallingStoplight(FallingChecks.RESTS)?.fallsPerHour == 0,
    "a rate of nothing")
check(
    "a stoplight saying nothing of falling decodes carrying neither",
    fallingStoplight("") != nil && fallingStoplight("")?.fallsPerHour == nil,
    "neither key sent")
check(
    "a stoplight carrying what colored it decodes rather than being refused",
    fallingStoplight(FallingChecks.SENT) != nil,
    "a key the tile reads nothing from")

// A LIGHT NOTHING COULD BE READ FOR IS SENT BLACK, WITH AN EMPTY FIGURE AND `readingHeld`.
func unheldBody(held: String = NO_READING_HELD) -> String {
    #"{"stoplights":[{"habit":"sleep","label":"Sleep","tier":"black","reading":"","readingHeld":"\#(held)"}]}"#
}

func safetyState(_ json: String) -> FeedState<SafetyLevelResponse> {
    guard let payload = try? JSONDecoder().decode(SafetyLevelResponse.self, from: Data(json.utf8))
    else { return .neverLoaded }
    return .loaded(payload)
}

let connectionBody = #"""
{"stoplights":[{"habit":"connection","label":"Connection","unit":"points","tier":"black","reading":"0","nextTier":"red","progress":0,"figureOffScale":true}]}
"""#
check(
    "the connection light the feed sends decodes with its figure",
    safetyReading(safetyState(connectionBody))?.reading == "0",
    String(describing: safetyReading(safetyState(connectionBody))))
check(
    "the connection tile is captioned with the label the feed sent",
    safetyCaption(safetyState(connectionBody)) == "Connection",
    String(describing: safetyCaption(safetyState(connectionBody))))
check(
    "the connection tile asks the connection feed",
    ConnectionFeed.endpoint.path == "/api/connection",
    ConnectionFeed.endpoint.path)
check(
    "a connection with no reading held is drawn as no signal",
    safetyNoSignal(safetyState(unheldBody())),
    "readingHeld none")

check(
    "a stoplight with no reading held decodes as no signal",
    decodeStoplights(stoplightFigureless)?.stoplights.first?.noSignal == true,
    "readingHeld none")
check(
    "a stoplight sent without readingHeld decodes with its signal",
    decodeStoplights(stoplightsBody(["connection"]))?.stoplights.first?.noSignal == false,
    "readingHeld not sent")
check(
    "a readingHeld word the tile does not know decodes rather than being refused",
    decodeStoplights(unheldBody(held: "stale"))?.stoplights.first?.noSignal == false,
    "readingHeld stale")
check(
    "a cost with no reading held is drawn as no signal",
    costNoSignal(costState(unheldBody())),
    "readingHeld none")
check(
    "a surplus with no reading held is drawn as no signal",
    surplusNoSignal(surplusState(unheldBody())),
    "readingHeld none")
check(
    "a safety level with no reading held is drawn as no signal",
    safetyNoSignal(safetyState(unheldBody())),
    "readingHeld none")
check(
    "a tile that never loaded draws no light of its own as no signal",
    !costNoSignal(FeedState<CostResponse>.neverLoaded),
    "neverLoaded")

print(failures == 0 ? "\nOK — \(assertions) assertions passed" : "\n\(failures) of \(assertions) assertions failed")
exit(failures == 0 ? 0 : 1)
