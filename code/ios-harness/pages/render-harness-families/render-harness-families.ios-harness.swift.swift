import CoreGraphics
import Foundation
import SwiftUI
import UIKit
import WidgetKit

struct FamilySpec {
    let source: String
    let cli: String
    let family: WidgetFamily
    let size: CGSize
}

let FAMILIES: [FamilySpec] = [
    FamilySpec(
        source: "systemSmall", cli: "small", family: .systemSmall,
        size: CGSize(width: 158, height: 158)),
    FamilySpec(
        source: "systemMedium", cli: "medium", family: .systemMedium,
        size: CGSize(width: 338, height: 158)),
    FamilySpec(
        source: "systemLarge", cli: "large", family: .systemLarge,
        size: CGSize(width: 338, height: 354)),
]

func familySpec(source: String) -> FamilySpec? {
    FAMILIES.first { $0.source == source }
}

let WIDGET_CONTENT_MARGIN: CGFloat = 16

func familySpec(cli: String) -> FamilySpec? {
    FAMILIES.first { $0.cli == cli }
}

struct SourceScan {
    let bundleWidgets: [String]
    let familiesByWidget: [String: [String]]
}

func matches(_ pattern: String, _ text: String) -> [[String]] {
    guard let expression = try? NSRegularExpression(pattern: pattern, options: [.dotMatchesLineSeparators])
    else { return [] }
    let ns = text as NSString
    return expression.matches(in: text, range: NSRange(location: 0, length: ns.length)).map { match in
        (0..<match.numberOfRanges).map { index in
            match.range(at: index).location == NSNotFound ? "" : ns.substring(with: match.range(at: index))
        }
    }
}

func scanSources(dir: String) throws -> SourceScan {
    let fm = FileManager.default
    let files = try fm.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".swift") }.sorted()

    var bundleWidgets: [String] = []
    var familiesByWidget: [String: [String]] = [:]

    for file in files {
        let path = (dir as NSString).appendingPathComponent(file)
        let text = try String(contentsOfFile: path, encoding: .utf8)

        let bundle = matches(#": WidgetBundle \{.*?var body: some Widget \{(.*?)\n {4}\}"#, text)
        if let body = bundle.first, body.count > 1 {
            for widget in matches(#"\n\s*([A-Z][A-Za-z0-9_]*)\(\)"#, body[1]) {
                bundleWidgets.append(widget[1])
            }
        }

        let declarations = matches(#"struct ([A-Za-z0-9_]+): Widget \{"#, text)
        for (index, declaration) in declarations.enumerated() {
            guard let start = text.range(of: declaration[0]) else { continue }
            var tail = String(text[start.lowerBound...])
            if index + 1 < declarations.count, let next = tail.range(of: declarations[index + 1][0]) {
                tail = String(tail[..<next.lowerBound])
            }
            let declared = matches(#"\.supportedFamilies\(\[([^\]]*)\]\)"#, tail)
            guard let list = declared.first, list.count > 1 else { continue }
            familiesByWidget[declaration[1]] = matches(#"\.([A-Za-z0-9_]+)"#, list[1]).map { $0[1] }
        }
    }

    return SourceScan(bundleWidgets: bundleWidgets, familiesByWidget: familiesByWidget)
}

func slug(_ widget: String) -> String {
    var name = widget
    if name.hasSuffix("Widget") { name.removeLast("Widget".count) }
    var out = ""
    for character in name {
        if character.isUppercase && !out.isEmpty { out.append("-") }
        out.append(Character(character.lowercased()))
    }
    return out
}
