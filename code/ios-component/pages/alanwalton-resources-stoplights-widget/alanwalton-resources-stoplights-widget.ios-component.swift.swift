import SwiftUI
import WidgetKit

struct ResourceStoplight: Decodable, Hashable {
    let resource: String
    let tier: Tier
    let reading: String?
    let nextTier: Tier?
    let progress: Double?
    let label: String?
    var unit: String? = nil
    var figureOffScale: Bool? = nil
    var takenAt: String? = nil
    var fallsPerHour: Double? = nil
    var rungs: [Rung]? = nil
    var readingHeld: String? = nil
}

extension ResourceStoplight {
    var noSignal: Bool { readingHeld == NO_READING_HELD }

    func figure(asOf now: Date) -> String? {
        FallingReading.figure(
            reading: reading, takenAt: takenAt, fallsPerHour: fallsPerHour, now: now
        )
    }

    // A STOPLIGHT THAT IS NOT FALLING KEEPS THE COLOR THE FEED SENT, WHICH IS STILL RIGHT.
    func shownTiered(asOf now: Date) -> Tiered {
        FallingReading.tiered(
            reading: reading, takenAt: takenAt, fallsPerHour: fallsPerHour, rungs: rungs, now: now
        ) ?? Tiered(tier: tier, nextTier: nextTier, progress: progress)
    }
}

struct ResourcesStoplightsResponse: Decodable {
    let stoplights: [ResourceStoplight]

    init(stoplights: [ResourceStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([ResourceStoplight].self, forKey: .stoplights)
        guard !decoded.isEmpty else {
            throw DecodingError.dataCorruptedError(
                forKey: .stoplights,
                in: container,
                debugDescription: "expected at least one resource stoplight, got none"
            )
        }
        stoplights = decoded
    }
}

private let RESOURCES_PREVIEW: [(
    resource: String, tier: Tier, reading: String, nextTier: Tier?, progress: Double?,
    label: String
)] = [
    ("surplus", .yellow, "-2.5", .green, 0.375, "Surplus"),
    ("capacity", .blue, "12.0", nil, nil, "Capacity"),
    ("constitution", .green, "1.2", .blue, 0.2, "Plants"),
    ("endurance", .yellow, "0.7", .green, 0.4, "Activity"),
    ("strength", .red, "0.3", .yellow, 0.2, "Pounds"),
    ("sleep", .red, "6.4", .yellow, 0.40, "Sleep"),
]

enum ResourcesStoplightsFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/resources-stoplights")!

    static let previewPayload = ResourcesStoplightsResponse(
        stoplights: RESOURCES_PREVIEW.map {
            ResourceStoplight(
                resource: $0.resource,
                tier: $0.tier,
                reading: $0.reading,
                nextTier: $0.nextTier,
                progress: $0.progress,
                label: $0.label,
                figureOffScale: true
            )
        }
    )
}

struct ResourcesHomeView: View {
    let entry: FeedEntry<ResourcesStoplightsResponse>

    var body: some View {
        Group {
            switch entry.state {
            case .loaded(let payload):
                grid(payload.stoplights)
            case .neverLoaded:
                NeverLoadedView()
            case .refused:
                RefusedView()
            }
        }
        .widgetTapLink(
            "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031-8fa1-44d2-be3a-561b457548f1#widget=alanwalton-resources-stoplights"
        )
    }

    private func grid(_ stoplights: [ResourceStoplight]) -> some View {
        let columns = Array(repeating: GridItem(.flexible(), spacing: SPACING_2), count: 3)
        return LazyVGrid(columns: columns, spacing: SPACING_2) {
            ForEach(stoplights, id: \.resource) {
                let shown = $0.shownTiered(asOf: entry.date)
                StoplightRing(
                    tier: shown.tier,
                    reading: $0.figure(asOf: entry.date),
                    nextTier: shown.nextTier,
                    progress: shown.progress,
                    label: $0.label ?? $0.resource,
                    figureOffScale: $0.figureOffScale ?? false,
                    noSignal: $0.noSignal
                )
            }
        }
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}

struct ResourcesStoplightsWidget: Widget {
    let kind = "ResourcesStoplightsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(
            kind: kind, provider: FeedProvider<ResourcesStoplightsFeed>(kind: kind)
        ) { entry in
            ResourcesHomeView(entry: entry)
        }
        .configurationDisplayName("Resources")
        .description("Your six resource stoplights, at a glance.")
        .supportedFamilies([.systemSmall])
    }
}
