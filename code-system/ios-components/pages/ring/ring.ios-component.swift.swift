import SwiftUI

enum RingStroke {
    case inscribed
    case centred
}

enum RingWidth {
    case points(lineWidth: CGFloat)
    case fractionOfDiameter(Double)
}

let LARGE_RING_STROKE = RingWidth.points(lineWidth: 12)

let LARGE_RING_TILE_PADDING = SPACING_1_5

struct RingArc {
    let fraction: Double
    let color: Color
}

struct RingCaption {
    let spacing: CGFloat
    let text: String?
    let font: Font
    let style: AnyShapeStyle
}

struct RingGlow {
    let color: Color
    let radius: CGFloat
}

struct RingNoneLeft {
    let inPlace: String?
    let words: String?

    init(inPlace: String? = nil, words: String? = nil) {
        self.inPlace = inPlace
        self.words = words
    }
}

struct RingMetrics {
    let diameter: CGFloat
    let strokeWidth: CGFloat
    let innerRadius: CGFloat
    let overhang: CGFloat
}

struct Ring<Figure: View>: View {
    let stroke: RingStroke
    let width: RingWidth
    let trackColor: Color
    let arc: RingArc?
    let lineCap: CGLineCap
    let caption: RingCaption?
    let glow: RingGlow?
    let noneLeft: RingNoneLeft?
    let figure: (RingMetrics) -> Figure

    init(
        stroke: RingStroke,
        width: RingWidth,
        trackColor: Color,
        arc: RingArc?,
        lineCap: CGLineCap,
        caption: RingCaption? = nil,
        glow: RingGlow? = nil,
        noneLeft: RingNoneLeft? = nil,
        @ViewBuilder figure: @escaping (RingMetrics) -> Figure
    ) {
        self.stroke = stroke
        self.width = width
        self.trackColor = trackColor
        self.arc = arc
        self.lineCap = lineCap
        self.caption = caption
        self.glow = glow
        self.noneLeft = noneLeft
        self.figure = figure
    }

    private func metrics(diameter: CGFloat) -> RingMetrics {
        let strokeWidth: CGFloat
        switch width {
        case .points(let lineWidth): strokeWidth = lineWidth
        case .fractionOfDiameter(let fraction): strokeWidth = diameter * fraction
        }
        let eaten: CGFloat
        switch stroke {
        case .inscribed: eaten = strokeWidth
        case .centred: eaten = strokeWidth / 2
        }
        return RingMetrics(
            diameter: diameter,
            strokeWidth: strokeWidth,
            innerRadius: diameter / 2 - eaten,
            overhang: strokeWidth - eaten
        )
    }

    var body: some View {
        captioned
    }

    @ViewBuilder private var captioned: some View {
        if let caption {
            VStack(spacing: caption.spacing) {
                figured
                if let text = labelled(caption) {
                    Text(text)
                        .font(caption.font)
                        .foregroundStyle(caption.style)
                        .lineLimit(1)
                        .minimumScaleFactor(0.6)
                }
            }
        } else {
            figured
        }
    }

    private func labelled(_ caption: RingCaption) -> String? {
        guard let noneLeft else { return caption.text }
        if noneLeft.inPlace != nil { return noneLeft.words }
        return noneLeft.words ?? caption.text
    }

    @ViewBuilder private var figured: some View {
        if let inPlace = noneLeft?.inPlace {
            drawnInPlace(inPlace)
        } else {
            haloed
        }
    }

    private func drawnInPlace(_ text: String) -> some View {
        GeometryReader { geo in
            let m = metrics(diameter: geo.size.width)
            let drawn = m.diameter + 2 * m.overhang
            Text(text)
                .font(.system(size: drawn))
                .minimumScaleFactor(0.01)
                .lineLimit(1)
                .frame(width: drawn, height: drawn)
                .offset(x: -m.overhang, y: -m.overhang)
        }
        .aspectRatio(1, contentMode: .fit)
    }

    @ViewBuilder private var haloed: some View {
        if let glow {
            drawing.shadow(color: glow.color, radius: glow.radius)
        } else {
            drawing
        }
    }

    private var drawing: some View {
        GeometryReader { geo in
            let m = metrics(diameter: geo.size.width)
            ZStack {
                track(m)
                if let arc {
                    sweep(m, arc)
                }
                if noneLeft == nil {
                    figure(m)
                }
            }
        }
        .aspectRatio(1, contentMode: .fit)
    }

    @ViewBuilder private func track(_ m: RingMetrics) -> some View {
        switch stroke {
        case .inscribed:
            Circle().strokeBorder(trackColor, lineWidth: m.strokeWidth)
        case .centred:
            Circle().stroke(trackColor, lineWidth: m.strokeWidth)
        }
    }

    @ViewBuilder private func sweep(_ m: RingMetrics, _ arc: RingArc) -> some View {
        switch stroke {
        case .inscribed:
            Circle()
                .inset(by: m.strokeWidth / 2)
                .trim(from: 0, to: arc.fraction)
                .stroke(
                    arc.color, style: StrokeStyle(lineWidth: m.strokeWidth, lineCap: lineCap)
                )
                .rotationEffect(.degrees(-90))
        case .centred:
            Circle()
                .trim(from: 0, to: arc.fraction)
                .stroke(
                    arc.color, style: StrokeStyle(lineWidth: m.strokeWidth, lineCap: lineCap)
                )
                .rotationEffect(.degrees(-90))
        }
    }
}

