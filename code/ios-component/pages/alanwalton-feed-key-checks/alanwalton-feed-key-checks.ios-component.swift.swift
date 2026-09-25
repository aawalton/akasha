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
