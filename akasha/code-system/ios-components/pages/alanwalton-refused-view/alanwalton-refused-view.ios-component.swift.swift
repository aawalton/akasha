import SwiftUI

struct RefusedView: View {
    var body: some View {
        VStack(spacing: SPACING_1_5) {
            Image(systemName: "lock.slash")
                .font(.system(size: 30, weight: .semibold))
            Text("Sign in")
                .font(.system(size: 12, weight: .medium))
        }
        .foregroundStyle(.secondary)
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}
