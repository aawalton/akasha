import SwiftUI

struct NeverLoadedView: View {
    var body: some View {
        NoSignalMark(glyphSize: 30, wordsSize: 12)
            .containerBackground(for: .widget) { Color(.systemBackground) }
    }
}
