import SwiftUI

struct StoplightRing: View {
    let tier: Tier
    let reading: String?
    let nextTier: Tier?
    let progress: Double?
    let label: String?

    private static let zero = "0"

    private static let ringFraction = 0.12
    private static let readingFraction = 0.26

    private static let lineHeightFactor = 1.2

    private var arc: (tier: Tier, progress: Double)? {
        guard let nextTier = nextTier, let progress = progress, progress > 0 else { return nil }
        return (nextTier, progress)
    }

    private var isAtEnd: Bool {
        arc == nil && (tier == .black || tier == .blue)
    }

    var body: some View {
        Ring(
            stroke: .inscribed,
            width: .fractionOfDiameter(Self.ringFraction),
            trackColor: tier.ringColor,
            arc: arc.map { RingArc(fraction: $0.progress, color: $0.tier.ringColor) },
            lineCap: .butt,
            caption: RingCaption(
                spacing: SPACING_0_5,
                text: label,
                font: .system(size: 9, weight: .medium),
                style: AnyShapeStyle(HierarchicalShapeStyle.secondary)
            ),
            glow: RingGlow(
                color: tier == .blue ? Color(.systemBlue).opacity(0.40) : .clear,
                radius: tier == .blue ? 6 : 0
            )
        ) { metrics in
            if !isAtEnd {
                let size = metrics.diameter * Self.readingFraction
                let line = size * Self.lineHeightFactor
                let halfWidth = max(
                    0, metrics.innerRadius * metrics.innerRadius - line * line / 4
                ).squareRoot()
                Text(reading ?? Self.zero)
                    .font(.system(size: size, weight: .semibold))
                    .foregroundStyle(.primary)
                    .lineLimit(1)
                    .frame(width: halfWidth * 2, height: line)
            }
        }
    }
}
