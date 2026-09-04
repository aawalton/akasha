import SwiftUI
import WidgetKit

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
                style: AnyShapeStyle(Color(.secondaryLabel))
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
