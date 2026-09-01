import { describe, expect, test } from "bun:test"
import {
  gateVerdictCoverage,
  isGateCoverageComplete,
  parseGateVerdict,
} from "./gate-verdict-schema.module.code.ts"

const REGISTRY = ["window-pane-prose", "system-voice"]

describe("parseGateVerdict", () => {
  test("nothing given is nothing back", () => {
    expect(parseGateVerdict(null)).toBe(null)
    expect(parseGateVerdict(undefined)).toBe(null)
  })

  test("a sound verdict parses", () => {
    const read = parseGateVerdict({ overall: "PASS", turnExternalId: "g-t1", attempts: 1 })
    expect(read?.overall).toBe("PASS")
  })

  test("an unsound verdict is nothing rather than a throw", () => {
    expect(parseGateVerdict({ overall: "MAYBE", turnExternalId: "g-t1", attempts: 1 })).toBe(null)
    expect(parseGateVerdict({ overall: "PASS" })).toBe(null)
  })
})

describe("gateVerdictCoverage", () => {
  test("every dimension judged once leaves no gap", () => {
    const gaps = gateVerdictCoverage(REGISTRY, [
      { dimension: "window-pane-prose", verdict: "clean", evidence: "e" },
      { dimension: "system-voice", verdict: "suspended", evidence: "e" },
    ])
    expect(gaps).toEqual({ missing: [], invented: [], duplicate: [] })
    expect(isGateCoverageComplete(gaps)).toBe(true)
  })

  test("a dimension left unjudged is missing", () => {
    const gaps = gateVerdictCoverage(REGISTRY, [
      { dimension: "system-voice", verdict: "clean", evidence: "e" },
    ])
    expect(gaps.missing).toEqual(["window-pane-prose"])
    expect(isGateCoverageComplete(gaps)).toBe(false)
  })

  test("a dimension the registry does not hold is invented", () => {
    const gaps = gateVerdictCoverage(REGISTRY, [
      { dimension: "window-pane-prose", verdict: "clean", evidence: "e" },
      { dimension: "system-voice", verdict: "clean", evidence: "e" },
      { dimension: "vibes", verdict: "clean", evidence: "e" },
    ])
    expect(gaps.invented).toEqual(["vibes"])
    expect(isGateCoverageComplete(gaps)).toBe(false)
  })

  test("judging one dimension twice is a duplicate", () => {
    const gaps = gateVerdictCoverage(REGISTRY, [
      { dimension: "window-pane-prose", verdict: "clean", evidence: "e" },
      { dimension: "window-pane-prose", verdict: "finding", evidence: "e" },
      { dimension: "system-voice", verdict: "clean", evidence: "e" },
    ])
    expect(gaps.duplicate).toEqual(["window-pane-prose"])
    expect(isGateCoverageComplete(gaps)).toBe(false)
  })

  test("no findings at all leaves every dimension missing", () => {
    expect(gateVerdictCoverage(REGISTRY, undefined).missing).toEqual(REGISTRY)
  })

  test("an empty registry with no findings is complete", () => {
    expect(isGateCoverageComplete(gateVerdictCoverage([], []))).toBe(true)
  })
})
