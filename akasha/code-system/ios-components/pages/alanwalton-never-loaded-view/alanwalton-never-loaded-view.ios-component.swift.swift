import SwiftUI

struct NeverLoadedView: View {
    var body: some View {
        VStack(spacing: SPACING_1_5) {
            Image(systemName: "wifi.slash")
                .font(.system(size: 30, weight: .semibold))
            Text("No signal")
                .font(.system(size: 12, weight: .medium))
        }
        .foregroundStyle(.secondary)
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}
