import Foundation

// EVERY KEY A FEED SENDS IS DECODED BY THE TILE READING THAT FEED.
//
// A light falling with the clock is sent its moment, its rate and the rungs of its scale, and
// a cost above nothing is sent the surplus its color was read with, trimmed to the five keys
// `ColoredWith` holds. Each body here carries those keys, and each check reads every one back.
enum FeedKeyChecks {
    static let RUNGS = [Rung(at: 0, color: .green), Rung(at: 4, color: .blue)]

    static let RUNGS_SENT = #""rungs":[{"at":0,"color":"green"},{"at":4,"color":"blue"}]"#

    static let FALLING = #","takenAt":"\#(FallingChecks.TOOK_AT)","fallsPerHour":1,\#(RUNGS_SENT)"#

    static let COLORED_WITH =
        #","coloredWith":{"tier":"blue","reading":"9","takenAt":"\#(FallingChecks.TOOK_AT)","#
        + #""fallsPerHour":2,\#(RUNGS_SENT)}"#

    static func falling(_ key: String) -> Data {
        Data(
            #"{"stoplights":[{"\#(key)":"sleep","label":"Sleep","tier":"green","reading":"2"\#(FALLING)}]}"#
                .utf8)
    }

    static func costing() -> HabitStoplight? {
        let sent = Data(
            #"{"stoplights":[{"habit":"cost","label":"Cost","tier":"yellow","reading":"0.5"\#(COLORED_WITH)}]}"#
                .utf8)
        return (try? JSONDecoder().decode(CostResponse.self, from: sent))?.cost
    }

    static let SAFE =
        #"{"stoplights":[{"habit":"safety","label":"Safety","unit":"levels","tier":"yellow","#
        + #""reading":"2.5","nextTier":"green","progress":0.5,"figureOffScale":true}]}"#

    static func safety() -> FeedState<SafetyLevelResponse> {
        guard let payload = try? JSONDecoder().decode(SafetyLevelResponse.self, from: Data(SAFE.utf8))
        else { return .neverLoaded }
        return .loaded(payload)
    }

    static func freshness(_ body: String) -> FreshnessReadout? {
        try? JSONDecoder().decode(FreshnessReadout.self, from: Data(body.utf8))
    }

    // THE FRESHNESS TILE READS THE PHONE'S OWN STORE, SO ITS BODY IS THE ONE A HARNESS HANDS IT.
    static func tiles() -> [(String, Bool, String)] {
        let safe = safetyReading(safety())
        let fresh = freshness(
            #"{"stalestSecondsAgo":2730,"stalestName":"attribute-stoplights","tiles":8}"#)
        let neverRead = freshness(#"{"stalestSecondsAgo":null,"stalestName":null,"tiles":0}"#)
        return [
            (
                "a safety level with a reading decodes to its figure, its color and its caption",
                safe?.reading == "2.5" && safe?.tier == .yellow && safe?.nextTier == .green
                    && safe?.progress == 0.5 && safe?.unit == "levels"
                    && safe?.figureOffScale == true && safetyCaption(safety()) == "Safety"
                    && !safetyNoSignal(safety()),
                String(describing: safe)
            ),
            (
                "a freshness body decodes to its age, its name and its count",
                fresh?.stalestSecondsAgo == 2730 && fresh?.stalestName == "attribute-stoplights"
                    && fresh?.tiles == 8,
                String(describing: fresh)
            ),
            (
                "a freshness body no feed has answered decodes with no age and no name",
                neverRead != nil && neverRead?.stalestSecondsAgo == nil
                    && neverRead?.stalestName == nil && neverRead?.tiles == 0,
                String(describing: neverRead)
            ),
        ]
    }

    static func run() -> [(String, Bool, String)] {
        let attribute = (try? JSONDecoder().decode(
            AttributeStoplightsResponse.self, from: falling("attribute")))?.stoplights.first
        let inbox = (try? JSONDecoder().decode(
            InboxStoplightsResponse.self, from: falling("inbox")))?.stoplights.first
        let colored = costing()?.coloredWith
        return [
            (
                "an attribute circle falling with the clock decodes its moment, its rate and its rungs",
                attribute?.takenAt == FallingChecks.TOOK_AT && attribute?.fallsPerHour == 1
                    && attribute?.rungs == RUNGS,
                String(describing: attribute)
            ),
            (
                "an inbox circle falling with the clock decodes its moment, its rate and its rungs",
                inbox?.takenAt == FallingChecks.TOOK_AT && inbox?.fallsPerHour == 1
                    && inbox?.rungs == RUNGS,
                String(describing: inbox)
            ),
            (
                "a cost carrying the trimmed surplus decodes every key of it",
                colored
                    == ColoredWith(
                        tier: .blue, reading: "9", takenAt: FallingChecks.TOOK_AT, fallsPerHour: 2,
                        rungs: RUNGS),
                String(describing: colored)
            ),
        ]
    }
}
