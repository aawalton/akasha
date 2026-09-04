import SwiftUI

enum Tier: String, Decodable {
    case black, red, orange, yellow, green, blue

    var fill: Color {
        switch self {
        case .black: return Color(.systemGray6)
        case .red: return Color(.systemRed)
        case .orange: return Color(.systemOrange)
        case .yellow: return Color(.systemYellow)
        case .green: return Color(.systemGreen)
        case .blue: return Color(.systemBlue)
        }
    }

    var glyphColor: Color {
        switch self {
        case .black: return Color(.systemGray).opacity(0.30)
        case .yellow: return Color.black.opacity(0.70)
        case .red, .orange, .green, .blue: return Color.white.opacity(0.90)
        }
    }

    var ringColor: Color {
        switch self {
        case .black: return Color(.systemGray4)
        case .red, .orange, .yellow, .green, .blue: return fill
        }
    }
}
