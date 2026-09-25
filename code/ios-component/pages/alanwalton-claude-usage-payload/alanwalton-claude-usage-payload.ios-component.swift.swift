import Foundation

// THE WORDS A READOUT'S PAGE STATES, SENT UNDER THAT READOUT'S WIRE KEY.
//
// A countdown draws its hours followed by `unit`, its minutes followed by `minuteUnit`, and
// `noneLeftWords` where no window is ahead.
struct ReadoutWords: Decodable, Equatable {
    let label: String?
    let unit: String?
    var noneLeftWords: String? = nil
    var minuteUnit: String? = nil
}

struct ClaudeUsage {
    let avgUsedPct: Int
    let fiveHourBackAt: Int?
    let sevenDayBackAt: Int?
    let sevenDayEndsAt: Int?
    let tier: Tier
    var readouts: [String: ReadoutWords] = [:]
}

// A BODY SENT BEFORE THE FEED CARRIED THE READOUTS' WORDS DECODES WITH NONE.
//
// The tile then draws its figures with no words beside them rather than words this file holds.
extension ClaudeUsage: Decodable {
    private enum CodingKeys: String, CodingKey {
        case avgUsedPct, fiveHourBackAt, sevenDayBackAt, sevenDayEndsAt, tier, readouts
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        avgUsedPct = try container.decode(Int.self, forKey: .avgUsedPct)
        fiveHourBackAt = try container.decode(Int?.self, forKey: .fiveHourBackAt)
        sevenDayBackAt = try container.decode(Int?.self, forKey: .sevenDayBackAt)
        sevenDayEndsAt = try container.decode(Int?.self, forKey: .sevenDayEndsAt)
        tier = try container.decode(Tier.self, forKey: .tier)
        readouts =
            try container.decodeIfPresent([String: ReadoutWords].self, forKey: .readouts) ?? [:]
    }
}

// THE WIRE KEYS THE CLAUDE USAGE READOUTS' PAGES STATE, ONE FOR EACH FIGURE THE TILE DRAWS.
extension ClaudeUsage {
    static let WEEKLY_USAGE = "weekly-usage"
    static let FIVE_HOUR_BACK = "five-hour-back"
    static let WEEKLY_BACK = "weekly-back"
    static let WEEKLY_ENDS = "weekly-ends"
}

// A COUNTDOWN DRAWS ONLY THE WORDS ITS READOUT'S PAGE STATES.
//
// A readout sent no words has its count drawn bare, and nothing drawn where none is left.
extension ClaudeUsage {
    static func countdown(to instant: Int?, from now: Date = Date(), in words: ReadoutWords?)
        -> String
    {
        let noneLeft = words?.noneLeftWords ?? ""
        guard let instant else { return noneLeft }
        let remaining = Double(instant) / 1000 - now.timeIntervalSince1970
        guard remaining > 0 else { return noneLeft }
        let hours = Int(remaining / 3600)
        if hours >= 1 { return "\(hours)\(words?.unit ?? "")" }
        return "\(max(1, Int(remaining / 60)))\(words?.minuteUnit ?? "")"
    }
}
