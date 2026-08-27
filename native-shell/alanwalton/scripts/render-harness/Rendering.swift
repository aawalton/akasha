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

func rgbaBytes(_ png: Data) -> (width: Int, height: Int, bytes: [UInt8])? {
    guard let image = UIImage(data: png)?.cgImage else { return nil }
    let width = image.width
    let height = image.height
    var buffer = [UInt8](repeating: 0, count: width * height * 4)
    let drawn = buffer.withUnsafeMutableBytes { raw -> Bool in
        guard
            let context = CGContext(
                data: raw.baseAddress, width: width, height: height, bitsPerComponent: 8,
                bytesPerRow: width * 4, space: CGColorSpaceCreateDeviceRGB(),
                bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)
        else { return false }
        context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
        return true
    }
    return drawn ? (width, height, buffer) : nil
}

enum Drift {
    case moved(Double)
    case incomparable(String)
}

func drift(rendered: Data, reference: Data) -> Drift {
    guard let new = rgbaBytes(rendered) else { return .incomparable("the rendered image would not decode") }
    guard let old = rgbaBytes(reference) else { return .incomparable("the reference image would not decode") }
    guard new.width == old.width, new.height == old.height else {
        return .incomparable(
            "the tile changed size: rendered \(new.width)x\(new.height), reference \(old.width)x\(old.height)")
    }
    var moved = 0
    for pixel in stride(from: 0, to: new.bytes.count, by: 4) {
        for channel in 0..<4
        where abs(Int(new.bytes[pixel + channel]) - Int(old.bytes[pixel + channel])) > 8 {
            moved += 1
            break
        }
    }
    return .moved(Double(moved) / Double(new.width * new.height))
}

let DRIFT_THRESHOLD = 0.0002
