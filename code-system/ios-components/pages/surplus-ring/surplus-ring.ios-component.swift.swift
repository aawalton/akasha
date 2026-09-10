import Foundation
import SwiftUI
import WidgetKit

// A READING THAT FALLS WITH THE CLOCK IS SUBTRACTED FROM WHERE IT IS DRAWN.
//
// The surplus is the night's sleep less what the day has spent, and the spend counts the
// stretch running now, so it falls one cost-of-an-hour for every hour of clock while nothing
// on disk changes. A tile drawing the figure the feed sent is right at the moment the reading
// was taken and stale by minutes ever after. The feed sends that moment and the rate beside
// the figure, and the subtraction happens here so every drawing is right when it is made.
//
// The figure is not held at zero. The surplus scale runs to black at minus twelve, so hours a
// day has eaten out of the night are a reading rather than an overflow.
enum FallingReading {
    private static let withFraction: ISO8601DateFormatter = {
        let read = ISO8601DateFormatter()
        read.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return read
    }()

    private static let plain = ISO8601DateFormatter()

    // EVERY INSTANT THE FEED SENDS IS READ HERE, SO NO TILE READS ONE ITS OWN WAY.
    static func instant(_ said: String?) -> Date? {
        guard let said else { return nil }
        return withFraction.date(from: said) ?? plain.date(from: said)
    }

    static func hoursSince(_ takenAt: String, _ now: Date) -> Double? {
        let took = instant(takenAt)
        guard let took else { return nil }
        let seconds = now.timeIntervalSince(took)
        return seconds <= 0 ? 0 : seconds / 3600
    }

    // THE FIGURE IS SPELLED AS THE FEED SPELLS ONE, SO THE TWO NEVER READ DIFFERENTLY.
    static func said(_ value: Double) -> String {
        guard value.isFinite else { return String(value) }
        if value == value.rounded(), abs(value) < 1e15 {
            return String(Int(value == 0 ? 0 : value))
        }
        let places = abs(value) >= 10 ? 0 : 1
        let scale = pow(10.0, Double(places))
        let floored = (value * scale).rounded(.down) / scale
        return String(format: "%.\(places)f", floored == 0 ? 0 : floored)
    }

    // THE FIGURE AND THE COLOR ARE READ OFF THIS ONE NUMBER, SO THE TWO NEVER DISAGREE.
    //
    // Nothing is answered for a reading that is not falling, or one no number can be read
    // from. Both callers then keep what the feed sent, which is right at that same moment.
    static func falling(
        reading: String?, takenAt: String?, fallsPerHour: Double?, now: Date
    ) -> Double? {
        guard let reading, let value = Double(reading) else { return nil }
        guard let takenAt, let fallsPerHour, fallsPerHour != 0 else { return nil }
        guard let hours = hoursSince(takenAt, now) else { return nil }
        return value - hours * fallsPerHour
    }

    static func figure(
        reading: String?, takenAt: String?, fallsPerHour: Double?, now: Date
    ) -> String? {
        guard let reading else { return nil }
        let shown = falling(
            reading: reading, takenAt: takenAt, fallsPerHour: fallsPerHour, now: now)
        guard let shown else { return reading }
        return said(shown)
    }

    static func tiered(
        reading: String?, takenAt: String?, fallsPerHour: Double?, rungs: [Rung]?, now: Date
    ) -> Tiered? {
        guard let rungs, !rungs.isEmpty else { return nil }
        let shown = falling(
            reading: reading, takenAt: takenAt, fallsPerHour: fallsPerHour, now: now)
        guard let shown else { return nil }
        return ReadingScale.tierAt(shown, rungs)
    }
}

struct SurplusResponse: Decodable {
    let stoplights: [HabitStoplight]

    init(stoplights: [HabitStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([HabitStoplight].self, forKey: .stoplights)
        guard !decoded.isEmpty else {
            throw DecodingError.dataCorruptedError(
                forKey: .stoplights,
                in: container,
                debugDescription: "expected at least one stoplight, got none"
            )
        }
        stoplights = decoded
    }

    var surplus: HabitStoplight? {
        stoplights.first
    }
}

struct SurplusRing: View {
    let tier: Tier?
    let reading: String?
    let caption: String?
    let nextTier: Tier?
    let progress: Double?

    // A TILE HANDING IN A MOMENT HAS ITS CAPTION COUNT DOWN TO THAT MOMENT INSTEAD.
    var until: Date? = nil

    private var arc: (tier: Tier, progress: Double)? {
        guard let nextTier, let progress, progress > 0 else { return nil }
        return (nextTier, progress)
    }

    var body: some View {
        Ring(
            stroke: .centred,
            width: LARGE_RING_STROKE,
            trackColor: tier?.ringColor ?? Color(.systemGray5),
            arc: arc.map { RingArc(fraction: $0.progress, color: $0.tier.ringColor) },
            lineCap: .round,
            caption: RingCaption(
                spacing: SPACING_2,
                text: caption,
                font: .system(size: 13, weight: .medium),
                style: AnyShapeStyle(Color(.secondaryLabel)),
                until: until
            ),
            glow: RingGlow(
                color: tier == .blue ? Color(.systemBlue).opacity(0.40) : .clear,
                radius: tier == .blue ? 6 : 0
            )
        ) { metrics in
            Text(reading ?? "—")
                .font(.system(size: 44, weight: .bold, design: .rounded))
                .foregroundStyle(Color(.label))
                .minimumScaleFactor(0.4)
                .lineLimit(1)
                .padding(.horizontal, metrics.strokeWidth + SPACING_1)
        }
    }
}

func surplusReading(_ state: FeedState<SurplusResponse>) -> HabitStoplight? {
    guard case .loaded(let payload) = state, let circle = payload.surplus else { return nil }
    if circle.tier == .black, circle.nextTier == nil, circle.progress == nil { return nil }
    return circle
}

func surplusCaption(_ state: FeedState<SurplusResponse>) -> String? {
    guard case .loaded(let payload) = state else { return nil }
    return payload.surplus?.label
}
