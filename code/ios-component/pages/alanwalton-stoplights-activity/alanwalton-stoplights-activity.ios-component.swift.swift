import ActivityKit
import SwiftUI
import WidgetKit

// EVERY STOPLIGHT ON ONE SURFACE, WHICH THREE TILES CANNOT BE.
//
// The thirteen stoplights are drawn by three tiles, so a glance at any one of them is a
// glance at a third of the answer. This draws all thirteen at once, on the lock screen and
// in the dynamic island, where a glance costs no unlock and no scroll.
//
// NOTHING HERE FETCHES. A tile asks the server on its own timeline; an activity is handed
// its content when it is started and by every push after, so what the lock screen shows is
// what was last pushed to it and never something this file went and got.

struct ActivityStoplight: Codable, Hashable, Identifiable {
    let key: String
    let label: String
    let tier: Tier
    let reading: String?
    let nextTier: Tier?
    let progress: Double?

    var id: String { key }
}

struct StoplightsAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable {
        let upkeep: [ActivityStoplight]
        let inboxes: [ActivityStoplight]
        let attributes: [ActivityStoplight]
        let takenAt: Date
    }
}

// THE WORST COLOR ON THE LIST IS WHAT THE SMALLEST DRAWING OF IT SHOWS.
//
// The island's compact and minimal forms have room for one mark, and the mark worth the room
// is the stoplight furthest from where it should be. The order here is worst first, with
// orange in its place among them.
private let TIER_WORST_FIRST: [Tier] = [.black, .red, .orange, .yellow, .green, .blue]

extension StoplightsAttributes.ContentState {
    var all: [ActivityStoplight] { upkeep + inboxes + attributes }

    var worst: Tier {
        var reached = TIER_WORST_FIRST.count - 1
        for light in all {
            guard let place = TIER_WORST_FIRST.firstIndex(of: light.tier) else { continue }
            reached = min(reached, place)
        }
        return TIER_WORST_FIRST[reached]
    }

    // A STOPLIGHT SHORT OF GREEN IS ONE ALAN STILL HAS SOMETHING TO DO ABOUT.
    var shortOfGreen: Int {
        all.filter { $0.tier != .green && $0.tier != .blue }.count
    }
}

private let ACTIVITY_RING_WIDTH: CGFloat = 38

private let ACTIVITY_GROUP_WIDTH: CGFloat = 58

struct StoplightsActivityRow: View {
    let name: String
    let lights: [ActivityStoplight]

    var body: some View {
        HStack(alignment: .top, spacing: SPACING_1_5) {
            Text(name)
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(.secondary)
                .lineLimit(1)
                .frame(width: ACTIVITY_GROUP_WIDTH, alignment: .leading)
                .padding(.top, SPACING_2)
            ForEach(lights) { light in
                StoplightRing(
                    tier: light.tier,
                    reading: light.reading,
                    nextTier: light.nextTier,
                    progress: light.progress,
                    label: light.label,
                    figureOffScale: true
                )
                .frame(width: ACTIVITY_RING_WIDTH)
            }
            Spacer()
        }
    }
}

struct StoplightsActivityView: View {
    let state: StoplightsAttributes.ContentState

    var body: some View {
        VStack(alignment: .leading, spacing: SPACING_2) {
            StoplightsActivityRow(name: "Upkeep", lights: state.upkeep)
            StoplightsActivityRow(name: "Inboxes", lights: state.inboxes)
            StoplightsActivityRow(name: "Attributes", lights: state.attributes)
        }
        .padding(SPACING_3)
    }
}

// THE ISLAND DROPS THE GROUP NAMES AND LETS THE THIRTEEN RINGS SHARE THE WIDTH.
//
// Naming the groups costs the width of three captions, and the island is already narrower
// than the lock screen. The rings keep the order the rows have, so the groups are still read
// off the run of them.
struct StoplightsIslandView: View {
    let state: StoplightsAttributes.ContentState

    var body: some View {
        HStack(spacing: SPACING_1) {
            ForEach(state.all) { light in
                StoplightRing(
                    tier: light.tier,
                    reading: light.reading,
                    nextTier: light.nextTier,
                    progress: light.progress,
                    label: nil,
                    figureOffScale: true
                )
                .frame(maxWidth: .infinity)
            }
        }
        .padding(.horizontal, SPACING_1)
    }
}

struct StoplightsTierDot: View {
    let tier: Tier

    var body: some View {
        Circle().fill(tier.ringColor).frame(width: 10, height: 10)
    }
}

struct StoplightsActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: StoplightsAttributes.self) { context in
            StoplightsActivityView(state: context.state)
                .activityBackgroundTint(Color(.systemBackground))
                .activitySystemActionForegroundColor(.primary)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.center) {
                    StoplightsIslandView(state: context.state)
                }
            } compactLeading: {
                StoplightsTierDot(tier: context.state.worst)
            } compactTrailing: {
                Text("\(context.state.shortOfGreen)")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(context.state.worst.ringColor)
            } minimal: {
                StoplightsTierDot(tier: context.state.worst)
            }
        }
    }
}
