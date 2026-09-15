import Foundation

struct ClaudeUsage {
    let avgUsedPct: Int
    let fiveHourBackAt: Int?
    let sevenDayBackAt: Int?
    let sevenDayEndsAt: Int?
    let tier: Tier
}

extension ClaudeUsage: Decodable {
    private enum CodingKeys: String, CodingKey {
        case avgUsedPct, fiveHourBackAt, sevenDayBackAt, sevenDayEndsAt, tier
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        avgUsedPct = try container.decode(Int.self, forKey: .avgUsedPct)
        fiveHourBackAt = try container.decode(Int?.self, forKey: .fiveHourBackAt)
        sevenDayBackAt = try container.decode(Int?.self, forKey: .sevenDayBackAt)
        sevenDayEndsAt = try container.decode(Int?.self, forKey: .sevenDayEndsAt)
        tier = try container.decode(Tier.self, forKey: .tier)
    }
}

extension ClaudeUsage {
    static func countdown(to instant: Int?, from now: Date = Date()) -> String {
        guard let instant else { return "none" }
        let remaining = Double(instant) / 1000 - now.timeIntervalSince1970
        guard remaining > 0 else { return "none" }
        let hours = Int(remaining / 3600)
        if hours >= 1 { return "\(hours)h" }
        return "\(max(1, Int(remaining / 60)))m"
    }
}
