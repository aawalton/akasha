import SwiftUI
import WidgetKit

private struct ClaudeUsageRing: View {
    let percent: Int?
    let ringColor: Color

    var body: some View {
        Ring(
            stroke: .centred,
            width: LARGE_RING_STROKE,
            trackColor: Color(.systemGray5),
            arc: RingArc(
                fraction: percent.map { min(1, max(0, Double($0) / 100)) } ?? 0,
                color: ringColor
            ),
            lineCap: .round,
            caption: RingCaption(
                spacing: SPACING_2,
                text: "Weekly Usage",
                font: .system(size: 13, weight: .medium),
                style: AnyShapeStyle(Color(.secondaryLabel))
            )
        ) { _ in
            HStack(alignment: .firstTextBaseline, spacing: 1) {
                Text(percent.map { "\($0)" } ?? "—")
                    .font(.system(size: 42, weight: .bold, design: .rounded))
                    .foregroundStyle(Color(.label))
                if percent != nil {
                    Text("%")
                        .font(.system(size: 16, weight: .semibold, design: .rounded))
                        .foregroundStyle(Color(.secondaryLabel))
                }
            }
            .minimumScaleFactor(0.5)
            .lineLimit(1)
            .padding(.horizontal, SPACING_2)
        }
    }
}

private struct ClaudeUsageRows: View {
    let usage: ClaudeUsage?

    var body: some View {
        Grid(alignment: .leading, horizontalSpacing: SPACING_2, verticalSpacing: SPACING_2) {
            row("5h back", usage?.fiveHourBackAt)
            row("7d back", usage?.sevenDayBackAt)
            row("7d ends", usage?.sevenDayEndsAt)
        }
    }

    private func row(_ label: String, _ instant: Int?) -> some View {
        GridRow {
            Text(label)
                .font(.system(size: 13, weight: .medium))
                .foregroundStyle(Color(.secondaryLabel))
            Text(usage == nil ? "—" : ClaudeUsage.countdown(to: instant))
                .font(.system(size: 15, weight: .semibold, design: .rounded))
                .foregroundStyle(Color(.label))
                .lineLimit(1)
                .minimumScaleFactor(0.6)
        }
    }
}

struct ClaudeUsageHomeView: View {
    let entry: FeedEntry<ClaudeUsage>

    var familyOverride: WidgetFamily?

    @Environment(\.widgetFamily) private var environmentFamily

    private var family: WidgetFamily { familyOverride ?? environmentFamily }

    var body: some View {
        Group {
            if case .refused = entry.state {
                RefusedView()
            } else if family == .systemMedium {
                HStack(spacing: SPACING_6) {
                    ring
                    ClaudeUsageRows(usage: usage)
                        .frame(maxWidth: .infinity, alignment: .center)
                }
            } else {
                ring
            }
        }
        .padding(LARGE_RING_TILE_PADDING)
        .containerBackground(for: .widget) { Color(.systemBackground) }
        .widgetURL(URL(string: "capacitor://localhost/nav/claude-accounts-d93b211a"))
    }

    private var usage: ClaudeUsage? {
        switch entry.state {
        case .loaded(let usage): return usage
        case .neverLoaded: return nil
        case .refused: return nil
        }
    }

    private var ring: some View {
        ClaudeUsageRing(
            percent: usage?.avgUsedPct,
            ringColor: usage?.tier.fill ?? Color(.systemGray3)
        )
    }
}
