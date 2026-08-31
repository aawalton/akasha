import SwiftUI
import WidgetKit

enum ClaudeUsageFeed: WidgetFeed {
    static let endpoint = URL(string: "https://alanwalton.com/api/claude-usage")!

    static var previewPayload: ClaudeUsage {
        let now = Date().timeIntervalSince1970
        func msFromNow(_ seconds: Double) -> Int { Int((now + seconds) * 1000) }
        return ClaudeUsage(
            avgUsedPct: 68,
            fiveHourBackAt: msFromNow(47 * 60),
            sevenDayBackAt: msFromNow(26 * 3600),
            sevenDayEndsAt: msFromNow(31 * 3600),
            tier: .yellow
        )
    }
}

struct ClaudeUsageWidget: Widget {
    let kind = "ClaudeUsageWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<ClaudeUsageFeed>()) { entry in
            ClaudeUsageHomeView(entry: entry)
        }
        .configurationDisplayName("Claude Usage")
        .description("Claude account usage and when capacity comes back.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

@main
struct AlanWaltonWidgets: WidgetBundle {
    var body: some Widget {
        ValuesStoplightsWidget()
        ClaudeUsageWidget()
        InboxStoplightsWidget()
        UpkeepStoplightsWidget()
        CategorizeWidget()
        PersonaStoplightsWidget()
        SafetyLevelWidget()
        SurplusWidget()
    }
}
