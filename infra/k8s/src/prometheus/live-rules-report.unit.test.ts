import { describe, expect, test } from "bun:test"
import { verdictExitCode, verdictFindingLines, verdictHeadline } from "@shared/verdict"
import { decideLiveRulesDrift } from "./decide-live-rules-drift"
import { driftReport, gateIntegrityReport, unreachableReport } from "./live-rules-report"

const AT = 1_700_000_000_000
const URL = "http://prometheus.prometheus.svc.cluster.local:9090"

const ref = (name: string) => ({ group: "g", type: "alerting" as const, name })

const drift = (attempts: number) =>
  driftReport(
    decideLiveRulesDrift({ committed: [ref("A"), ref("B")], live: [ref("A")], observedAtMs: AT }),
    URL,
    attempts
  )

const clean = () =>
  driftReport(
    decideLiveRulesDrift({ committed: [ref("A")], live: [ref("A")], observedAtMs: AT }),
    URL,
    1
  )

const emptyCommitted = () =>
  driftReport(decideLiveRulesDrift({ committed: [], live: [], observedAtMs: AT }), URL, 1)

const unreachable = () =>
  unreachableReport({
    promUrl: URL,
    error: "connection refused",
    committedCount: 68,
    attempts: 12,
    observedAtMs: AT,
  })

const gateIntegrity = () =>
  gateIntegrityReport({ error: "the decider passed a known-bad pair", observedAtMs: AT })

describe("every terminating path carries a verdict", () => {
  test.each([
    ["clean", clean],
    ["drift", drift.bind(null, 3)],
    ["empty committed set", emptyCommitted],
    ["unreachable", unreachable],
    ["gate-integrity failure", gateIntegrity],
  ])("%s", (_label, build) => {
    expect(build().verdict.kind).toBeString()
  })
})

describe("the documented exit contract survives a two-valued verdict", () => {
  test.each([
    ["clean", clean, 0],
    ["drift", drift.bind(null, 3), 1],
    ["empty committed set", emptyCommitted, 2],
    ["unreachable", unreachable, 2],
    ["gate-integrity failure", gateIntegrity, 2],
  ])("%s exits %i", (_label, build, code) => {
    expect(build().exitCode).toBe(code)
  })

  test("the three non-drift codes are not what the verdict alone would have said", () => {
    for (const build of [emptyCommitted, unreachable, gateIntegrity]) {
      expect(verdictExitCode(build().verdict)).toBe(1)
      expect(build().exitCode).toBe(2)
    }
  })
})

describe("an absent observation is never a pass", () => {
  test.each([
    ["unreachable", unreachable],
    ["an empty committed set", emptyCommitted],
    ["a gate-integrity failure", gateIntegrity],
  ])("%s fails, and names what stopped it", (_label, build) => {
    const report = build()
    expect(report.verdict.kind).toBe("fail")
    expect(verdictFindingLines(report.verdict)).not.toBeEmpty()
  })
})

describe("the claim is self-sufficient without the detail", () => {
  test.each([
    ["clean", clean],
    ["drift", drift.bind(null, 3)],
    ["unreachable", unreachable],
    ["gate-integrity failure", gateIntegrity],
  ])("%s names its subject and its reason on the one line", (_label, build) => {
    const headline = verdictHeadline(build().verdict)
    expect(headline).toContain("the-live-prometheus-rule-set")
    expect(headline.length).toBeGreaterThan("VERDICT: PASS — x: y".length)
  })

  test("the unreachable claim names the endpoint it could not read", () => {
    expect(verdictHeadline(unreachable().verdict)).toContain(URL)
  })

  test("the unreachable claim states how many rules went unverified", () => {
    expect(verdictHeadline(unreachable().verdict)).toContain("68")
  })

  test("a non-success states how many attempts it made before giving up", () => {
    expect(verdictHeadline(drift(7).verdict)).toContain("7 attempt(s)")
    expect(verdictHeadline(unreachable().verdict)).toContain("12 attempt(s)")
  })
})

describe("the detail carries what the one line cannot", () => {
  test("drift names the rollout restart that delivers a subPath mount", () => {
    expect(drift(3).detail.join("\n")).toContain("kubectl rollout restart")
  })

  test("drift names each divergent rule, once, through the findings", () => {
    expect(verdictFindingLines(drift(3).verdict).join("\n")).toContain("g/alerting/B")
    expect(drift(3).detail.join("\n")).not.toContain("g/alerting/B")
  })

  test("a clean run needs no remediation", () => {
    expect(clean().detail).toEqual([])
  })
})

describe("the json payload keeps its shape", () => {
  test("drift carries the counts and the findings", () => {
    const json = drift(3).json
    expect(json.committedCount).toBe(2)
    expect(json.liveCount).toBe(1)
    expect(json.attempts).toBe(3)
    expect(json.prometheusUrl).toBe(URL)
  })

  test("unreachable carries the error and the unverified count", () => {
    const json = unreachable().json
    expect(json.error).toBe("connection refused")
    expect(json.committedCount).toBe(68)
  })
})
