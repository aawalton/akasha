import SwiftUI

// THE WORD A FEED SENDS AS `readingHeld` FOR A READOUT NOTHING COULD BE READ FOR.
//
// The key is read as text rather than as a closed set of words, so a word a later feed learns
// fails no tile's whole decode on a phone older than that word.
let NO_READING_HELD = "none"

// A READING NOTHING COULD BE TAKEN FOR IS DRAWN AS NO SIGNAL RATHER THAN AS A ZERO.
//
// One mark says it for a whole tile and for a single light inside a group, so the two read as
// one thing. The caller sizes the glyph and the words to the room it has.
struct NoSignalMark: View {
    let glyphSize: CGFloat
    let wordsSize: CGFloat

    var body: some View {
        VStack(spacing: glyphSize * 0.2) {
            Image(systemName: "wifi.slash")
                .font(.system(size: glyphSize, weight: .semibold))
            Text("No signal")
                .font(.system(size: wordsSize, weight: .medium))
                .minimumScaleFactor(0.6)
                .lineLimit(1)
        }
        .foregroundStyle(.secondary)
    }
}

struct StoplightRing: View {
    let tier: Tier
    let reading: String?
    let nextTier: Tier?
    let progress: Double?
    let label: String?
    var figureOffScale: Bool = false
    var noSignal: Bool = false

    private static let zero = "0"

    private static let ringFraction = 0.12
    private static let readingFraction = 0.26
    private static let glyphFraction = 0.22
    private static let wordsFraction = 0.16

    private static let lineHeightFactor = 1.2

    private var arc: (tier: Tier, progress: Double)? {
        guard let nextTier = nextTier, let progress = progress, progress > 0, progress < 1
        else { return nil }
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
            if noSignal {
                NoSignalMark(
                    glyphSize: metrics.diameter * Self.glyphFraction,
                    wordsSize: metrics.diameter * Self.wordsFraction
                )
                .frame(width: metrics.innerRadius * 2 - SPACING_0_5 * 2)
            } else if figureOffScale || !isAtEnd {
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
