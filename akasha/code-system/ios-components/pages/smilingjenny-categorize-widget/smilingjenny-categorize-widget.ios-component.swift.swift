import SwiftUI
import WidgetKit

struct CategorizeWidget: Widget {
    let kind = "CategorizeWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeedProvider<CategorizationFeed>()) { entry in
            CategorizeHomeView(entry: entry)
        }
        .configurationDisplayName("Left to Review")
        .description("How many of the past year's transactions Monarch is waiting to have reviewed.")
        .supportedFamilies([.systemSmall])
    }
}

@main
struct SmilingJennyWidgets: WidgetBundle {
    var body: some Widget {
        CategorizeWidget()
        SafetyLevelWidget()
        SurplusWidget()
    }
}
