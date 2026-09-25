import Foundation

// WHAT THE CLAUDE USAGE TILE DECODES, AND THE WORDS ITS COUNTDOWN DRAWS FROM WHAT IT DECODED.
//
// The countdown words are the ones the three countdown readouts' pages state, sent under each
// readout's wire key. A second set of words is checked beside them, so a word the tile held
// of its own would fail rather than pass by matching the page.
enum ClaudeUsageChecks {
    static let STATED = ReadoutWords(
        label: "5h back", unit: "h", noneLeftWords: "none", minuteUnit: "m")

    static let OTHER = ReadoutWords(
        label: nil, unit: " hrs", noneLeftWords: "clear", minuteUnit: " min")

    static let REFERENCE = Date(timeIntervalSince1970: 1_785_000_000)

    static let OLD_SHAPE = #"{"avgUsedPct":54,"nextResetHours":94,"tier":"blue"}"#

    static let NEW_SHAPE =
        #"{"avgUsedPct":54,"fiveHourBackAt":null,"sevenDayBackAt":1754236799832,"#
        + #""sevenDayEndsAt":1754496000655,"tier":"blue"}"#

    static let BAD_TYPE =
        #"{"avgUsedPct":"fifty-four","fiveHourBackAt":null,"sevenDayBackAt":null,"#
        + #""sevenDayEndsAt":null,"tier":"blue"}"#

    static let WORDED =
        #"{"avgUsedPct":54,"fiveHourBackAt":null,"sevenDayBackAt":null,"sevenDayEndsAt":null,"#
        + #""tier":"blue","readouts":{"five-hour-back":{"label":"5h back","unit":"h","#
        + #""noneLeftWords":"none","minuteUnit":"m"},"#
        + #""weekly-usage":{"label":"Weekly Usage","unit":"%"}}}"#

    static func decoded(_ json: String) -> ClaudeUsage? {
        try? JSONDecoder().decode(ClaudeUsage.self, from: Data(json.utf8))
    }

    static func countdown(_ secondsFromNow: Double, in words: ReadoutWords?) -> String {
        let instant = Int((REFERENCE.timeIntervalSince1970 + secondsFromNow) * 1000)
        return ClaudeUsage.countdown(to: instant, from: REFERENCE, in: words)
    }

    static func decodes() -> [(String, Bool, String)] {
        let usage = decoded(NEW_SHAPE)
        let worded = decoded(WORDED)
        let unworded = ReadoutWords(label: "Weekly Usage", unit: "%")
        return [
            ("a body of the old shape is rejected", decoded(OLD_SHAPE) == nil, "the cached pre-change body"),
            (
                "a well-formed body decodes to its values",
                usage?.avgUsedPct == 54 && usage?.fiveHourBackAt == nil
                    && usage?.sevenDayBackAt == 1_754_236_799_832
                    && usage?.sevenDayEndsAt == 1_754_496_000_655 && usage?.tier == .blue,
                String(describing: usage)
            ),
            ("a non-integer avgUsedPct is rejected", decoded(BAD_TYPE) == nil, "threw before this change too"),
            (
                "a readout's countdown words decode under its wire key",
                worded?.readouts[ClaudeUsage.FIVE_HOUR_BACK] == STATED,
                String(describing: worded?.readouts[ClaudeUsage.FIVE_HOUR_BACK])
            ),
            (
                "a readout sent no countdown words decodes with none",
                worded?.readouts[ClaudeUsage.WEEKLY_USAGE] == unworded,
                String(describing: worded?.readouts[ClaudeUsage.WEEKLY_USAGE])
            ),
        ]
    }

    static func spellings() -> [(String, String, String)] {
        [
            ("a null row reads the none-left words", ClaudeUsage.countdown(to: nil, from: REFERENCE, in: STATED), "none"),
            ("an instant already passed reads the none-left words", countdown(-1, in: STATED), "none"),
            ("an instant exactly now reads the none-left words", countdown(0, in: STATED), "none"),
            ("26 hours reads 26h", countdown(26 * 3600, in: STATED), "26h"),
            ("one hour exactly reads 1h", countdown(3600, in: STATED), "1h"),
            ("just under an hour falls to minutes", countdown(3599, in: STATED), "59m"),
            ("47 minutes reads 47m", countdown(47 * 60, in: STATED), "47m"),
            ("just under a minute floors UP to 1m", countdown(59, in: STATED), "1m"),
            ("one second still reads 1m", countdown(1, in: STATED), "1m"),
            ("the hour unit drawn is the one the readout states", countdown(26 * 3600, in: OTHER), "26 hrs"),
            ("the minute unit drawn is the one the readout states", countdown(47 * 60, in: OTHER), "47 min"),
            ("the none-left words drawn are the ones the readout states", countdown(-1, in: OTHER), "clear"),
            ("a readout sent no words draws its hours bare", countdown(26 * 3600, in: nil), "26"),
            ("a readout sent no words draws its minutes bare", countdown(47 * 60, in: nil), "47"),
            ("a readout sent no words draws nothing for none left", countdown(-1, in: nil), ""),
        ]
    }

    static func run() -> [(String, Bool, String)] {
        decodes() + spellings().map { ($0.0, $0.1 == $0.2, "got \($0.1), want \($0.2)") }
    }
}
