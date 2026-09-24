import SwiftUI
import WidgetKit

struct InboxStoplight: Decodable, Hashable {
    let inbox: String
    let tier: Tier
    let reading: String?
    let nextTier: Tier?
    let progress: Double?
    let label: String?
    var unit: String? = nil
    var figureOffScale: Bool? = nil
    var readingHeld: String? = nil

    var noSignal: Bool { readingHeld == NO_READING_HELD }
}

struct InboxStoplightsResponse: Decodable {
    let stoplights: [InboxStoplight]

    init(stoplights: [InboxStoplight]) {
        self.stoplights = stoplights
    }

    private enum CodingKeys: String, CodingKey {
        case stoplights
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let decoded = try container.decode([InboxStoplight].self, forKey: .stoplights)
        guard !decoded.isEmpty else {
            throw DecodingError.dataCorruptedError(
                forKey: .stoplights,
                in: container,
                debugDescription: "expected at least one inbox stoplight, got none"
            )
        }
        stoplights = decoded
    }
}

private let INBOX_PREVIEW: [(
    inbox: String, tier: Tier, reading: String, nextTier: Tier?, progress: Double?, label: String
)] = [
    ("email", .blue, "0", nil, nil, "Email"),
    ("tasks", .yellow, "4", .blue, 0.5555555555555556, "Tasks"),
    ("temperTasks", .red, "23", .yellow, 0.8444444444444444, "Temper"),
    ("findings", .yellow, "3", .blue, 0.7777777777777778, "Findings"),
    ("gaps", .red, "993", .yellow, 0.6713333333333333, "Gaps"),
]

enum InboxStoplightsFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/inbox-stoplights")!

    static let previewPayload = InboxStoplightsResponse(
        stoplights: INBOX_PREVIEW.map {
            InboxStoplight(
                inbox: $0.inbox,
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

struct InboxHomeView: View {
    let entry: FeedEntry<InboxStoplightsResponse>

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
        .widgetTapLink("capacitor://localhost/nav/tasks-a7242626#widget=alanwalton-inbox-stoplights")
    }

    private func grid(_ stoplights: [InboxStoplight]) -> some View {
        let columns = Array(repeating: GridItem(.flexible(), spacing: SPACING_2), count: 3)
        return LazyVGrid(columns: columns, spacing: SPACING_2) {
            ForEach(stoplights, id: \.inbox) {
                StoplightRing(
                    tier: $0.tier,
                    reading: $0.reading,
                    nextTier: $0.nextTier,
                    progress: $0.progress,
                    label: $0.label ?? $0.inbox,
                    figureOffScale: $0.figureOffScale ?? false,
                    noSignal: $0.noSignal
                )
            }
        }
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}

struct InboxStoplightsWidget: Widget {
    let kind = "InboxStoplightsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<InboxStoplightsFeed>(kind: kind)) {
            entry in
            InboxHomeView(entry: entry)
        }
        .configurationDisplayName("Inboxes")
        .description("Your five inbox stoplights, at a glance.")
        .supportedFamilies([.systemSmall])
    }
}
