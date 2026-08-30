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
    let total: Int
    let intake: Int?
    let scale: BacklogScale?
    let noneLeftWords: String?
    let noneLeftEmoji: String?

    init(
        unreviewed: Int, total: Int, intake: Int?, scale: BacklogScale? = nil,
        noneLeftWords: String? = nil, noneLeftEmoji: String? = nil
    ) {
        self.unreviewed = unreviewed
        self.total = total
        self.intake = intake
        self.scale = scale
        self.noneLeftWords = noneLeftWords
        self.noneLeftEmoji = noneLeftEmoji
    }
}

extension Categorization: Decodable {
    private enum CodingKeys: String, CodingKey {
        case unreviewed, total, intake, scale, noneLeftWords, noneLeftEmoji
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        unreviewed = try container.decode(Int.self, forKey: .unreviewed)
        total = try container.decode(Int.self, forKey: .total)
        intake = try container.decodeIfPresent(Int.self, forKey: .intake)
        scale = try container.decodeIfPresent(BacklogScale.self, forKey: .scale)
        noneLeftWords = try container.decodeIfPresent(String.self, forKey: .noneLeftWords)
        noneLeftEmoji = try container.decodeIfPresent(String.self, forKey: .noneLeftEmoji)
    }
}

extension Categorization {
    var settledFraction: Double? {
        guard let intake, intake > 0 else { return nil }
        let settled = 1 - Double(unreviewed) / Double(intake)
        return min(1, max(0, settled))
    }
}

typealias CategorizeReading = (
    settled: Double, left: Int, scale: BacklogScale?, noneLeftWords: String?, noneLeftEmoji: String?
)

func categorizeReading(_ state: FeedState<Categorization>) -> CategorizeReading? {
    guard case .loaded(let counts) = state, let settled = counts.settledFraction else { return nil }
    return (settled, counts.unreviewed, counts.scale, counts.noneLeftWords, counts.noneLeftEmoji)
}

enum CompletionBand {
    case black, red, yellow, green, blue

    static func of(_ settled: Double) -> CompletionBand {
        if settled >= 1 { return .blue }
        if settled >= 0.75 { return .green }
        if settled >= 0.5 { return .yellow }
        if settled >= 0.25 { return .red }
        return .black
    }

    var color: Color {
        switch self {
        case .black: return Color(.label)
        case .red: return Color(.systemRed)
        case .yellow: return Color(.systemYellow)
        case .green: return Color(.systemGreen)
        case .blue: return Color(.systemBlue)
        }
    }
}

struct CategorizeTile: View {
    let reading: CategorizeReading?

    private var arcColor: Color {
        guard let reading else { return Color(.systemGray3) }
        guard let tier = reading.scale?.tier(for: reading.left) else {
            return CompletionBand.of(reading.settled).color
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
            arc: RingArc(fraction: reading?.settled ?? 0, color: arcColor),
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
                .foregroundStyle(Color(.label))
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
