import SwiftUI
import WidgetKit

struct BacklogScale: Decodable, Equatable {
    let yellowAt: Int?
    let orangeAt: Int
    let redAt: Int
    let blackAt: Int
}

extension BacklogScale {
    func tier(for count: Int) -> Tier? {
        if count >= blackAt { return .black }
        if count >= redAt { return .red }
        if count >= orangeAt { return .orange }
        if let yellowAt, count >= yellowAt { return .yellow }
        return nil
    }
}

struct Categorization {
    let unreviewed: Int
    let scale: BacklogScale?
    let noneLeftWords: String?
    let noneLeftEmoji: String?

    init(
        unreviewed: Int, scale: BacklogScale? = nil,
        noneLeftWords: String? = nil, noneLeftEmoji: String? = nil
    ) {
        self.unreviewed = unreviewed
        self.scale = scale
        self.noneLeftWords = noneLeftWords
        self.noneLeftEmoji = noneLeftEmoji
    }
}

extension Categorization: Decodable {
    private enum CodingKeys: String, CodingKey {
        case unreviewed, scale, noneLeftWords, noneLeftEmoji
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        unreviewed = try container.decode(Int.self, forKey: .unreviewed)
        scale = try container.decodeIfPresent(BacklogScale.self, forKey: .scale)
        noneLeftWords = try container.decodeIfPresent(String.self, forKey: .noneLeftWords)
        noneLeftEmoji = try container.decodeIfPresent(String.self, forKey: .noneLeftEmoji)
    }
}

typealias CategorizeReading = (
    left: Int, scale: BacklogScale?, noneLeftWords: String?, noneLeftEmoji: String?
)

func categorizeReading(_ state: FeedState<Categorization>) -> CategorizeReading? {
    guard case .loaded(let counts) = state else { return nil }
    return (counts.unreviewed, counts.scale, counts.noneLeftWords, counts.noneLeftEmoji)
}

struct CategorizeTile: View {
    let reading: CategorizeReading?

    private var countColor: Color {
        guard let reading, let tier = reading.scale?.tier(for: reading.left) else {
            return Color(.label)
        }
        return backlogColor(tier)
    }

    private var noneLeft: RingNoneLeft? {
        guard let reading, reading.left == 0 else { return nil }
        if reading.noneLeftEmoji == nil, reading.noneLeftWords == nil { return nil }
        return RingNoneLeft(inPlace: reading.noneLeftEmoji, words: reading.noneLeftWords)
    }

    var body: some View {
        Ring(
            stroke: .centred,
            width: LARGE_RING_STROKE,
            trackColor: Color(.systemGray5),
            arc: nil,
            lineCap: .round,
            caption: RingCaption(
                spacing: SPACING_2,
                text: "Unreviewed",
                font: .system(size: 13, weight: .medium),
                style: AnyShapeStyle(Color(.secondaryLabel))
            ),
            noneLeft: noneLeft
        ) { metrics in
            Text(reading.map { $0.left.formatted() } ?? "—")
                .font(.system(size: 36, weight: .bold, design: .rounded))
                .foregroundStyle(countColor)
                .minimumScaleFactor(0.4)
                .lineLimit(1)
                .padding(.horizontal, metrics.strokeWidth + SPACING_1)
        }
    }
}

private func backlogColor(_ tier: Tier) -> Color {
    switch tier {
    case .black: return Color(.label)
    default: return tier.fill
    }
}

let MONARCH_RELAY_URL = URL(string: "capacitor://monarch-relay")
