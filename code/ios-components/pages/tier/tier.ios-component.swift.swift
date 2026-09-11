import SwiftUI

enum Tier: String, Decodable {
    case black, red, orange, yellow, green, blue

    var fill: Color {
        switch self {
        case .black: return Color(.systemGray6)
        case .red: return Color(.systemRed)
        case .orange: return Color(.systemOrange)
        case .yellow: return Color(.systemYellow)
        case .green: return Color(.systemGreen)
        case .blue: return Color(.systemBlue)
        }
    }

    var glyphColor: Color {
        switch self {
        case .black: return Color(.systemGray).opacity(0.30)
        case .yellow: return Color.black.opacity(0.70)
        case .red, .orange, .green, .blue: return Color.white.opacity(0.90)
        }
    }

    var ringColor: Color {
        switch self {
        case .black: return Color(.systemGray4)
        case .red, .orange, .yellow, .green, .blue: return fill
        }
    }
}

struct Rung: Decodable, Hashable {
    let at: Double
    let color: Tier
}

struct Tiered: Hashable {
    let tier: Tier
    let nextTier: Tier?
    let progress: Double?
}

// WHERE A READING SITS AMONG THE RUNGS, WORKED OUT THE WAY THE SERVER WORKS IT OUT.
//
// The server colors a reading at the moment that reading was taken. A reading that falls
// with the clock has moved by the time a tile draws it, so a tile drawing the fallen figure
// inside the color of the figure as taken promises a precision it does not keep. The feed
// therefore sends the rungs beside a falling reading and the tile colors the figure it draws.
//
// Which rungs a scale has is still the server's to say. Nothing here reads a scale page, adds
// a rung a scale left out, or reads the black rung in under a climbing scale. This places a
// reading among rungs already chosen, and no more.
enum ReadingScale {
    static let belowEveryRung = Tier.black

    static func climbs(_ rungs: [Rung]) -> Bool {
        guard rungs.count >= 2 else { return false }
        for i in 1..<rungs.count where rungs[i].at <= rungs[i - 1].at { return false }
        return true
    }

    static func falls(_ rungs: [Rung]) -> Bool {
        guard rungs.count >= 2 else { return false }
        for i in 1..<rungs.count where rungs[i].at >= rungs[i - 1].at { return false }
        return true
    }

    private static func climbedTo(_ reading: Double, _ rungs: [Rung]) -> Tiered {
        var reached = -1
        for i in 0..<rungs.count where reading >= rungs[i].at { reached = i }

        guard reached >= 0 else {
            let above = rungs.first { $0.color != belowEveryRung }
            return Tiered(tier: belowEveryRung, nextTier: above?.color, progress: nil)
        }
        let here = rungs[reached]
        guard reached + 1 < rungs.count else {
            return Tiered(tier: here.color, nextTier: nil, progress: nil)
        }
        let next = rungs[reached + 1]
        let climbed = (reading - here.at) / (next.at - here.at)
        return Tiered(tier: here.color, nextTier: next.color, progress: min(1, max(0, climbed)))
    }

    private static func fellTo(_ reading: Double, _ rungs: [Rung]) -> Tiered {
        var reached = rungs.count - 1
        for i in 0..<rungs.count where reading >= rungs[i].at {
            reached = i
            break
        }

        guard reached >= 0, reached < rungs.count else {
            return Tiered(tier: belowEveryRung, nextTier: nil, progress: nil)
        }
        let here = rungs[reached]
        guard reached + 1 < rungs.count else {
            return Tiered(tier: here.color, nextTier: nil, progress: nil)
        }
        let next = rungs[reached + 1]
        guard reached >= 1 else {
            return Tiered(tier: here.color, nextTier: next.color, progress: nil)
        }
        let over = rungs[reached - 1]
        let fell = (over.at - reading) / (over.at - here.at)
        return Tiered(tier: here.color, nextTier: next.color, progress: min(1, max(0, fell)))
    }

    static func tierAt(_ reading: Double, _ rungs: [Rung]) -> Tiered? {
        guard reading.isFinite else { return nil }
        if climbs(rungs) { return climbedTo(reading, rungs) }
        if falls(rungs) { return fellTo(reading, rungs) }
        return nil
    }

    // THE RUNG A FALLING READING REACHES NEXT IS THE HIGHEST ONE IT IS STRICTLY OVER.
    //
    // A reading sitting exactly on a rung is answered the rung under that one, it having
    // already reached the one it sits on. A reading under every rung reaches none.
    static func rungUnder(_ reading: Double, _ rungs: [Rung]) -> Double? {
        var under: Double? = nil
        for rung in rungs where rung.at < reading {
            if under == nil || rung.at > (under ?? 0) { under = rung.at }
        }
        return under
    }
}
