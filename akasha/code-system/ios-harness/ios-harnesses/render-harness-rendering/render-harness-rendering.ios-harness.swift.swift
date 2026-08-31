import CoreGraphics
import Foundation
import SwiftUI
import UIKit
import WidgetKit

@MainActor
func render(_ view: AnyView, size: CGSize, placeholder: Bool = false) throws -> Data {
    let framed = view
        .padding(WIDGET_CONTENT_MARGIN)
        .frame(width: size.width, height: size.height)
        .background(Color(.systemBackground))
        .environment(\.colorScheme, .light)
        .redacted(reason: placeholder ? .placeholder : [])
    let renderer = ImageRenderer(content: framed)
    renderer.scale = 2
    guard let image = renderer.uiImage else { throw Harness.failed("ImageRenderer produced no image") }
    guard let png = image.pngData() else { throw Harness.failed("the rendered image produced no PNG") }
    return png
}
