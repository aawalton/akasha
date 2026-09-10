import Foundation

// THE CHECKS ON A READING THAT FALLS, WRITTEN ONCE FOR BOTH HARNESSES TO RUN.
//
// Both apps draw the same falling figure and the same counting caption out of the same two
// components, so the assertions on them were the same text in two files. Each harness runs
// what it finds here and keeps only the checks on the stoplight struct that is its own.
enum FallingChecks {
    static let TOOK_AT = "2026-09-10T16:00:00.000Z"

    static let PAST_AT = "2026-09-10T20:55:33.600Z"

    static let FALLS = #","takenAt":"\#(TOOK_AT)","fallsPerHour":1"#

    static let RESTS = #","takenAt":"\#(TOOK_AT)","fallsPerHour":0"#

    static let SENT = #","fallsPastAt":"\#(PAST_AT)""#

    static let read: ISO8601DateFormatter = {
        let reader = ISO8601DateFormatter()
        reader.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return reader
    }()

    static var tookAt: Date { read.date(from: TOOK_AT) ?? Date() }

    static func body(_ figure: String, _ extra: String) -> String {
        #"{"stoplights":[{"habit":"surplus","tier":"green","label":"Surplus","reading":"\#(figure)"\#(extra)}]}"#
    }

    private static func surplus(_ extra: String, _ figure: String = "9.5") -> HabitStoplight? {
        let sent = Data(body(figure, extra).utf8)
        return (try? JSONDecoder().decode(SurplusResponse.self, from: sent))?.surplus
    }

    private static func after(
        _ minutes: Double, _ extra: String, _ figure: String = "9.5"
    ) -> String? {
        surplus(extra, figure)?.figure(asOf: tookAt.addingTimeInterval(minutes * 60))
    }

    private static func costing(_ extra: String) -> HabitStoplight? {
        let sent = Data(
            #"{"stoplights":[{"habit":"cost","tier":"red","reading":"0.5","label":"Cost"\#(extra)}]}"#
                .utf8)
        return (try? JSONDecoder().decode(CostResponse.self, from: sent))?.cost
    }

    private static func said(_ name: String, _ drew: String?, _ want: String) -> (
        String, Bool, String
    ) {
        (name, drew == want, "got \(String(describing: drew)), want \(want)")
    }

    static func decoding() -> [(String, Bool, String)] {
        [
            (
                "a stoplight saying it falls with the clock decodes with its moment and its rate",
                surplus(FALLS)?.takenAt == TOOK_AT && surplus(FALLS)?.fallsPerHour == 1,
                String(describing: surplus(FALLS))
            ),
            (
                "a stoplight saying it falls at nothing an hour decodes",
                surplus(RESTS)?.fallsPerHour == 0, "a rate of nothing"
            ),
            (
                "a stoplight saying nothing of falling decodes carrying neither",
                surplus("") != nil && surplus("")?.takenAt == nil
                    && surplus("")?.fallsPerHour == nil,
                "neither key sent"
            ),
            (
                "a cost carrying the instant it falls past a rung decodes with that instant",
                costing(SENT)?.fallsPastAt == PAST_AT, String(describing: costing(SENT))
            ),
            (
                "a cost saying nothing of falling past a rung decodes carrying none",
                costing("") != nil && costing("")?.fallsPastAt == nil, "no such key sent"
            ),
        ]
    }

    static func figuring() -> [(String, Bool, String)] {
        [
            said("a falling reading at the moment taken is the figure sent", after(0, FALLS), "9.5"),
            said("half an hour on has half an hour off it", after(30, FALLS), "9"),
            said("an hour on has an hour off it", after(60, FALLS), "8.5"),
            said("a reading falling at nothing an hour is shown as sent", after(60, RESTS), "9.5"),
            said("a reading saying nothing of falling is shown as sent", after(60, ""), "9.5"),
            said(
                "a falling reading goes below zero rather than being held there",
                after(180, FALLS, "0.5"), "-2.5"),
            said("a moment later than now takes nothing off the reading", after(-60, FALLS), "9.5"),
            said(
                "a reading falling twice as fast falls twice as far",
                FallingReading.figure(
                    reading: "9.5", takenAt: TOOK_AT, fallsPerHour: 2,
                    now: tookAt.addingTimeInterval(1800)),
                "8.5"),
            said(
                "a moment that is no instant leaves the reading as sent",
                FallingReading.figure(reading: "9.5", takenAt: "never", fallsPerHour: 1, now: tookAt),
                "9.5"),
            said(
                "an empty figure is left empty rather than read as a number",
                FallingReading.figure(
                    reading: "", takenAt: TOOK_AT, fallsPerHour: 1,
                    now: tookAt.addingTimeInterval(3600)),
                ""),
            (
                "a stoplight carrying no figure is left carrying none",
                FallingReading.figure(
                    reading: nil, takenAt: TOOK_AT, fallsPerHour: 1, now: tookAt) == nil,
                "no figure at all"
            ),
            (
                "an instant with no fractional seconds is read too",
                FallingReading.hoursSince(
                    "2026-09-10T16:00:00Z", tookAt.addingTimeInterval(3600)) == 1,
                "a plain instant"
            ),
        ]
    }

    static func counting() -> [(String, Bool, String)] {
        let at = read.date(from: PAST_AT)
        let before = at?.addingTimeInterval(-1800) ?? tookAt
        let past = at?.addingTimeInterval(1800) ?? tookAt
        return [
            (
                "an instant still ahead is the moment counted down to",
                CostCountdown.reaching(PAST_AT, before) == at, "half an hour to go"
            ),
            (
                "an instant already gone is no moment at all",
                CostCountdown.reaching(PAST_AT, past) == nil, "half an hour past"
            ),
            (
                "an instant exactly now is no moment at all",
                CostCountdown.reaching(PAST_AT, at ?? before) == nil, "the moment itself"
            ),
            (
                "no instant sent is no moment at all",
                CostCountdown.reaching(nil, before) == nil, "no key sent"
            ),
            (
                "an instant that is no instant is no moment at all",
                CostCountdown.reaching("never", before) == nil, "words where a moment goes"
            ),
            (
                "an instant with no fractional seconds is counted to as well",
                CostCountdown.reaching("2026-09-10T20:55:33Z", before)
                    == read.date(from: "2026-09-10T20:55:33.000Z"),
                "a plain instant"
            ),
        ]
    }

    // THE SURPLUS SCALE, WHICH IS THE ONE A FALLING READING IS ACTUALLY COLORED ON.
    static let SURPLUS = [
        Rung(at: -12, color: .black), Rung(at: -8, color: .red), Rung(at: -4, color: .yellow),
        Rung(at: 0, color: .green), Rung(at: 4, color: .blue),
    ]

    private static func surplusRungs() -> String {
        let entries = SURPLUS.map { #"{"at":\#($0.at),"color":"\#($0.color.rawValue)"}"# }
        return #","rungs":[\#(entries.joined(separator: ","))]"#
    }

    static func coloring() -> [(String, Bool, String)] {
        let carried = surplus(FALLS + surplusRungs(), "4.5")
        let anHourOn = tookAt.addingTimeInterval(3600)
        let longAfter = tookAt.addingTimeInterval(36000)
        return [
            (
                "a stoplight carrying its rungs decodes with every one of them",
                carried?.rungs == SURPLUS, String(describing: carried?.rungs)
            ),
            (
                "a stoplight saying nothing of its rungs decodes carrying none",
                surplus(FALLS) != nil && surplus(FALLS)?.rungs == nil, "no rungs sent"
            ),
            (
                "a falling stoplight is colored at the moment taken before it has fallen",
                carried?.shownTiered(asOf: tookAt).tier == .blue,
                String(describing: carried?.shownTiered(asOf: tookAt))
            ),
            (
                "a falling stoplight that has crossed a rung is colored on the rung it reached",
                carried?.shownTiered(asOf: anHourOn).tier == .green,
                String(describing: carried?.shownTiered(asOf: anHourOn))
            ),
            (
                "the color and the figure are read off one number rather than two",
                carried?.figure(asOf: anHourOn) == "3.5"
                    && carried?.shownTiered(asOf: anHourOn).tier == .green,
                String(describing: carried?.figure(asOf: anHourOn))
            ),
            (
                "a falling stoplight carries the tier above and the fraction climbed too",
                carried?.shownTiered(asOf: anHourOn).nextTier == .blue
                    && carried?.shownTiered(asOf: anHourOn).progress == 0.875,
                String(describing: carried?.shownTiered(asOf: anHourOn))
            ),
            (
                "a stoplight carrying no rungs keeps the color the feed sent",
                surplus(FALLS)?.shownTiered(asOf: longAfter).tier == .green, "the tier as sent"
            ),
            (
                "a stoplight that is not falling keeps the color the feed sent",
                surplus(RESTS + surplusRungs())?.shownTiered(asOf: longAfter).tier == .green,
                "the tier as sent"
            ),
        ]
    }

    static func run() -> [(String, Bool, String)] {
        decoding() + figuring() + counting() + coloring()
    }
}
