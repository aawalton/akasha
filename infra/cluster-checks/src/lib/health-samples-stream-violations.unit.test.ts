import { describe, expect, test } from "bun:test"
import {
  extractEmittedSwift,
  findHealthSamplesStreamViolations,
} from "./health-samples-stream-violations.ts"

const SEAM = `
some shell above
cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'
@available(iOS 16.0, *)
struct StreamHealthSamplesIntent: AppIntent {
    func perform() async throws -> some IntentResult & ReturnsValue<String> {
        StreamHealthSamplesIntent.resetStateIfNeeded()
        var lines: [String] = []
        for (metric, quantityType) in resolved {
            lines.append(await StreamHealthSamplesIntent.stream(store: store))
        }
        return .result(value: lines.joined(separator: " "))
    }

    private static func stream(store: HKHealthStore) async -> String {
        var anchor = readAnchor(for: metric)
        let predicate: NSPredicate? =
            anchor == nil
            ? HKQuery.predicateForSamples(
                withStart: seedStart(), end: nil, options: .strictStartDate)
            : nil
        for _ in 0..<maxRoundsPerMetric {
            if samples.isEmpty {
                // writeAnchor is deliberately absent here
                break
            }
            switch await post(secret: secret, samples: payload) {
            case .failure(let reason):
                return "\\(metric.wireName): \\(reason)"
            case .success(let report):
                anchor = newAnchor
                writeAnchor(newAnchor, for: metric)
            }
        }
        if sent == 0 {
            return await sweep(
                store: store, metric: metric, quantityType: quantityType, secret: secret)
        }
        return "Sent \\(sent) \\(metric.wireName) samples in \\(posts) batches."
    }

    private static func sweep(store: HKHealthStore) async -> String {
        guard let samples = await runWindowQuery(store: store, start: seedStart()) else {
            return "could not be run."
        }
        return "found \\(samples.count)"
    }

    private static func runWindowQuery(store: HKHealthStore) async -> [HKQuantitySample]? {
        let query = HKSampleQuery(
            sampleType: quantityType, predicate: predicate, limit: HKObjectQueryNoLimit)
        store.execute(query)
    }

    private static func writeAnchor(_ anchor: HKQueryAnchor, for metric: Metric) {
        UserDefaults.standard.set(data, forKey: metric.anchorKey)
    }

    private static func seedStart() -> Date {
        Date().addingTimeInterval(-seedWindowSeconds)
    }

    private static func resetStateIfNeeded() {
        let defaults = UserDefaults.standard
        guard defaults.integer(forKey: stateGenerationKey) < stateGeneration else { return }
        for metric in metrics {
            defaults.removeObject(forKey: metric.anchorKey)
            defaults.removeObject(forKey: metric.legacyFloorKey)
        }
        defaults.set(stateGeneration, forKey: stateGenerationKey)
    }
}
SWIFT_HEALTH_SAMPLES
echo "OK"
`

const rules = (text: string): readonly string[] =>
  findHealthSamplesStreamViolations(text).map((v) => v.rule)

describe("extractEmittedSwift", () => {
  test("takes only the heredoc body, so shell around it cannot satisfy a rule", () => {
    const swift = extractEmittedSwift(SEAM)
    expect(swift).toContain("struct StreamHealthSamplesIntent")
    expect(swift).not.toContain("some shell above")
    expect(swift).not.toContain('echo "OK"')
  })

  test("an absent block is undefined rather than empty — the two must not read alike", () => {
    expect(extractEmittedSwift("nothing here")).toBeUndefined()
  })

  test("an unterminated heredoc is undefined rather than the rest of the file", () => {
    expect(extractEmittedSwift(SEAM.replace("SWIFT_HEALTH_SAMPLES\n", ""))).toBeUndefined()
  })
})

describe("findHealthSamplesStreamViolations", () => {
  test("the fixture is clean, so every failure below is the mutation and not the fixture", () => {
    expect(findHealthSamplesStreamViolations(SEAM)).toEqual([])
  })

  test("a missing block is reported rather than passing over nothing", () => {
    const v = findHealthSamplesStreamViolations("no heredoc at all")
    expect(v.map((x) => x.rule)).toEqual(["block-present"])
    expect(v[0]?.message).toContain("a reading of nothing")
  })

  test("writeAnchor in the empty-page branch is caught — THE regression", () => {
    const bad = SEAM.replace(
      "                // writeAnchor is deliberately absent here",
      "                writeAnchor(newAnchor, for: metric)"
    )
    expect(rules(bad)).toContain("empty-page-anchor-write")
  })

  test("a second anchor write anywhere is caught, wherever it is put", () => {
    const bad = SEAM.replace(
      "        if sent == 0 {",
      "        writeAnchor(newAnchor, for: metric)\n        if sent == 0 {"
    )
    expect(rules(bad)).toContain("single-anchor-write")
  })

  test("removing the only legitimate anchor write is caught too", () => {
    const bad = SEAM.replace("                writeAnchor(newAnchor, for: metric)\n", "")
    expect(rules(bad)).toContain("single-anchor-write")
  })

  test("the one write moved to the POST failure arm is caught — the count alone is not", () => {
    const bad = SEAM.replace(
      "            case .success(let report):\n                anchor = newAnchor\n                writeAnchor(newAnchor, for: metric)\n",
      "            case .success(let report):\n                anchor = newAnchor\n"
    ).replace(
      "            case .failure(let reason):\n",
      "            case .failure(let reason):\n                writeAnchor(newAnchor, for: metric)\n"
    )
    expect(rules(bad)).toContain("anchor-write-off-success-arm")
    expect(rules(bad)).not.toContain("single-anchor-write")
  })

  test("losing the success arm refuses rather than passing over a rule it cannot measure", () => {
    const bad = SEAM.replace("            case .success(let report):", "            default:")
    expect(rules(bad)).toContain("post-success-arm")
  })

  test("persisting the seed floor again is caught", () => {
    const bad = SEAM.replace(
      "        Date().addingTimeInterval(-seedWindowSeconds)",
      "        let seeded = Date().addingTimeInterval(-seedWindowSeconds)\n        defaults.set(seeded, forKey: metric.legacyFloorKey)"
    )
    expect(rules(bad)).toContain("persisted-floor")
  })

  test("applying a date window beside an anchor is caught", () => {
    const bad = SEAM.replace("            anchor == nil\n", "            false\n")
    expect(rules(bad)).toContain("seed-window-only-unanchored")
  })

  test("a window chosen on a token that merely mentions the anchor is caught", () => {
    const bad = SEAM.replace(
      "        let predicate: NSPredicate? =\n            anchor == nil\n",
      "        let alwaysWindow = anchor == nil || true\n        let predicate: NSPredicate? =\n            alwaysWindow\n"
    )
    expect(rules(bad)).toContain("seed-window-only-unanchored")
  })

  test("a window applied where there is an anchor is caught from the other branch too", () => {
    const bad = SEAM.replace("            : nil\n", "            : HKQuery.predicateForSamples()\n")
    expect(rules(bad)).toContain("seed-window-only-unanchored")
  })

  test("losing the predicate declaration refuses rather than passing over it", () => {
    const bad = SEAM.replace(
      "        let predicate: NSPredicate? =\n            anchor == nil\n",
      "        let predicate: NSPredicate? = anchor == nil\n"
    )
    expect(rules(bad)).toContain("seed-window-predicate-shape")
  })

  test("deleting the backstop is caught", () => {
    const bad = SEAM.replace("    private static func sweep(", "    private static func unused(")
    expect(rules(bad)).toContain("sweep-present")
  })

  test("a backstop that carries a cursor instead of none is caught", () => {
    const bad = SEAM.replace("HKSampleQuery(", "HKAnchoredObjectQuery(")
    expect(rules(bad)).toContain("sweep-is-cursorless")
  })

  test("no longer reaching the backstop on an empty send is caught", () => {
    const bad = SEAM.replace(
      "        if sent == 0 {\n            return await sweep(",
      '        if sent == 0 {\n            return "nothing new to send."\n        }\n        if false {\n            return await sweep('
    )
    expect(rules(bad)).toContain("sweep-is-reached")
  })

  test("dropping the state reset is caught", () => {
    const bad = SEAM.replace(
      "    private static func resetStateIfNeeded() {",
      "    private static func unusedReset() {"
    )
    expect(rules(bad)).toContain("state-reset")
  })

  test("a reset that no longer runs before the metric loop is caught", () => {
    const bad = SEAM.replace("        StreamHealthSamplesIntent.resetStateIfNeeded()\n", "")
    expect(rules(bad)).toContain("state-reset-runs-first")
  })

  test("a reset standing textually first inside a condition never met is caught", () => {
    const bad = SEAM.replace(
      "        StreamHealthSamplesIntent.resetStateIfNeeded()\n",
      "        if resolved.isEmpty {\n            StreamHealthSamplesIntent.resetStateIfNeeded()\n        }\n"
    )
    expect(rules(bad)).toContain("state-reset-runs-first")
    expect(rules(bad)).not.toContain("state-reset")
  })

  test("a reset moved below the loop it must precede is caught", () => {
    const bad = SEAM.replace(
      "        StreamHealthSamplesIntent.resetStateIfNeeded()\n        var lines: [String] = []\n",
      "        var lines: [String] = []\n"
    ).replace(
      '        return .result(value: lines.joined(separator: " "))\n',
      '        StreamHealthSamplesIntent.resetStateIfNeeded()\n        return .result(value: lines.joined(separator: " "))\n'
    )
    expect(bad).toContain("StreamHealthSamplesIntent.resetStateIfNeeded()\n        return .result")
    expect(rules(bad)).toContain("state-reset-runs-first")
  })

  test("a day rule reaching the stream is caught", () => {
    const bad = SEAM.replace(
      "        var anchor = readAnchor(for: metric)",
      "        let day = EsoLogicalDay.day(Date(), offsetBy: 0)"
    )
    expect(rules(bad)).toContain("no-day-rule")
  })

  test("a rule cannot be satisfied by a comment naming the construct it looks for", () => {
    const bad = SEAM.replace(
      "    private static func sweep(",
      "    // static func sweep( — removed\n    private static func unused("
    )
    expect(rules(bad)).toContain("sweep-present")
  })

  test("a comment naming writeAnchor inside the empty-page branch is not a violation", () => {
    const ok = SEAM.replace(
      "                // writeAnchor is deliberately absent here",
      "                // writeAnchor is never called here, and that is the repair"
    )
    expect(rules(ok)).not.toContain("empty-page-anchor-write")
  })
})
