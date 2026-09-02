import CoreGraphics
import Foundation
import SwiftUI
import UIKit
import WidgetKit

struct Options {
    var widgetSources = ""
    var out = ""
    var onlyWidget: String?
    var onlyFamily: String?
    var payloadFile: String?
}

func parseOptions() throws -> Options {
    var options = Options()
    var arguments = Array(CommandLine.arguments.dropFirst())
    while let flag = arguments.first {
        arguments.removeFirst()
        func value() throws -> String {
            guard let next = arguments.first else { throw Harness.failed("\(flag) wants a value") }
            arguments.removeFirst()
            return next
        }
        switch flag {
        case "--widget-sources": options.widgetSources = try value()
        case "--out": options.out = try value()
        case "--widget": options.onlyWidget = try value()
        case "--family": options.onlyFamily = try value()
        case "--payload": options.payloadFile = try value()
        default: throw Harness.failed("unknown flag \(flag)")
        }
    }
    let required = [("--widget-sources", options.widgetSources), ("--out", options.out)]
    for (name, path) in required where path.isEmpty {
        throw Harness.failed("\(name) is required")
    }
    return options
}

var failures: [String] = []
var passes = 0

func report(_ passed: Bool, _ name: String, _ detail: String) {
    print(passed ? "PASS" : "FAIL", "—", name, "—", detail)
    if passed { passes += 1 } else { failures.append(name) }
}

@MainActor
func run() throws {
    let options = try parseOptions()
    let fm = FileManager.default
    try fm.createDirectory(atPath: options.out, withIntermediateDirectories: true)

    let scan = try scanSources(dir: options.widgetSources)
    guard !scan.bundleWidgets.isEmpty else {
        throw Harness.failed(
            "no WidgetBundle body was found under \(options.widgetSources), so the harness cannot tell what ships")
    }

    let now = Date()
    let all = cases(now: now)

    for widget in scan.bundleWidgets {
        let declared = scan.familiesByWidget[widget] ?? []
        if declared.isEmpty {
            report(
                false, "coverage/\(slug(widget))",
                "the bundle ships it and no `supportedFamilies` was found for it")
            continue
        }
        for family in declared {
            let name = "coverage/\(slug(widget))/\(family)"
            if familySpec(source: family) == nil {
                report(false, name, "declared, and the harness has no size for that family")
            } else if !all.contains(where: { $0.widget == widget && $0.familySource == family }) {
                report(false, name, "declared, and no case renders it")
            } else {
                report(true, name, "declared and covered")
            }
        }
    }

    var selected = all
    if let wanted = options.onlyWidget {
        let match = scan.bundleWidgets.first {
            $0.lowercased() == wanted.lowercased() || slug($0) == wanted.lowercased()
        }
        guard let widget = match else {
            throw Harness.unreachable(
                "no widget named `\(wanted)` ships from the bundle; it holds "
                    + scan.bundleWidgets.map(slug).joined(separator: ", "))
        }
        selected = selected.filter { $0.widget == widget }
        guard !selected.isEmpty else {
            throw Harness.unreachable(
                "`\(wanted)` ships from the bundle and no case in this harness renders it")
        }
    }
    if let wanted = options.onlyFamily {
        guard let spec = familySpec(cli: wanted) else {
            throw Harness.unreachable(
                "no family named `\(wanted)`; the harness draws "
                    + FAMILIES.map(\.cli).joined(separator: ", "))
        }
        selected = selected.filter { $0.familySource == spec.source }
        guard !selected.isEmpty else {
            throw Harness.unreachable("nothing selected here renders at `\(wanted)`")
        }
    }

    var payloadBody: String?
    if let file = options.payloadFile {
        payloadBody = try String(contentsOfFile: file, encoding: .utf8)
        var seen = Set<String>()
        selected = selected.filter { seen.insert("\($0.widget)/\($0.familySource)").inserted }
    }

    var renderedByWidget: [String: [(name: String, png: Data)]] = [:]
    for item in selected {
        guard let spec = familySpec(source: item.familySource) else {
            report(false, item.name, "the harness has no size for family \(item.familySource)")
            continue
        }
        let body = payloadBody ?? item.body
        let name = payloadBody == nil ? item.name : "\(slug(item.widget))-\(spec.cli)-payload"
        let artifact = (options.out as NSString).appendingPathComponent("\(name).png")

        let png: Data
        do {
            let view = try makeView(
                widget: item.widget, body: Data(body.utf8), family: spec.family, at: now,
                unreadable: payloadBody == nil && item.unreadable,
                refused: payloadBody == nil && item.refused)
            png = try render(
                view, size: item.sizeOverride ?? spec.size, placeholder: item.placeholder)
            try png.write(to: URL(fileURLWithPath: artifact))
        } catch {
            report(false, name, Harness.message(error))
            continue
        }
        renderedByWidget[item.widget, default: []].append((name: name, png: png))
        // Nothing here judges what was drawn. Whoever changed the drawing reads the
        // PNG and says whether it is right; a pixel threshold never could have said
        // the ring was the wrong color.
        report(true, name, "drew \(name).png")
    }

    for (widget, renders) in renderedByWidget.sorted(by: { $0.key < $1.key }) {
        for refused in renders where refused.name.hasSuffix("-refused") {
            let twins = renders.filter { $0.name != refused.name && $0.png == refused.png }
            report(
                twins.isEmpty, "\(slug(widget))/refused-is-distinct",
                twins.isEmpty
                    ? "differs from all \(renders.count - 1) other render(s) of this tile"
                    : "renders byte-identical to \(twins.map(\.name).joined(separator: ", ")) — "
                        + "the refused state has no picture of its own")
        }
    }
}

MainActor.assumeIsolated {
    do {
        try run()
    } catch {
        print("FAIL — harness — \(Harness.message(error))")
        failures.append("harness")
    }
    if failures.isEmpty {
        print("\nOK — \(passes) case(s) passed")
        exit(0)
    }
    print("\n\(failures.count) failed: \(failures.joined(separator: ", "))")
    exit(1)
}
