import { describe, expect, test } from "bun:test"
import { z } from "zod"
import type { LatestBuild } from "./asc-client"
import {
  classifyInternalBuildState,
  classifyProcessingState,
  describeProcessingFailure,
  formatProcessingFailureMarker,
  type PollDeps,
  PROCESSING_FAILURE_MARKER_KIND,
  pollBuildUntilTerminal,
  pollUntilTesterVisible,
  processingFailureFor,
  type VisibilityPollDeps,
  visibilityFailureFor,
} from "./testflight-poll"

function build(overrides: Partial<LatestBuild> = {}): LatestBuild {
  return { id: "b-new", version: "5", processingState: "PROCESSING", ...overrides }
}

describe("classifyProcessingState", () => {
  test("VALID is terminal success", () => {
    expect(classifyProcessingState("VALID")).toBe("valid")
  })
  test("FAILED and INVALID are terminal failures", () => {
    expect(classifyProcessingState("FAILED")).toBe("failed")
    expect(classifyProcessingState("INVALID")).toBe("failed")
  })
  test("PROCESSING and any unknown/blank state stay non-terminal", () => {
    expect(classifyProcessingState("PROCESSING")).toBe("processing")
    expect(classifyProcessingState("")).toBe("processing")
    expect(classifyProcessingState("SOMETHING_NEW")).toBe("processing")
  })
  test("is case/whitespace tolerant", () => {
    expect(classifyProcessingState("  valid ")).toBe("valid")
    expect(classifyProcessingState("invalid")).toBe("failed")
  })
})

describe("processing failure marker", () => {
  const markerSchema = z
    .object({
      marker: z.literal(PROCESSING_FAILURE_MARKER_KIND),
      failureClass: z.enum(["TESTFLIGHT_PROCESSING_FAILED", "TESTFLIGHT_PROCESSING_INVALID"]),
      processingState: z.string(),
      version: z.string(),
      remediation: z.string(),
    })
    .strict()

  test("FAILED → TESTFLIGHT_PROCESSING_FAILED with a parseable marker line", () => {
    const failure = processingFailureFor(build({ processingState: "FAILED", version: "5" }))
    expect(failure.failureClass).toBe("TESTFLIGHT_PROCESSING_FAILED")
    const parsed = markerSchema.parse(JSON.parse(formatProcessingFailureMarker(failure)))
    expect(parsed.version).toBe("5")
    expect(parsed.processingState).toBe("FAILED")
  })

  test("INVALID → TESTFLIGHT_PROCESSING_INVALID", () => {
    const failure = processingFailureFor(build({ processingState: "INVALID" }))
    expect(failure.failureClass).toBe("TESTFLIGHT_PROCESSING_INVALID")
  })

  test("describeProcessingFailure ends with the JSON marker as its FINAL line", () => {
    const failure = processingFailureFor(build({ processingState: "FAILED" }))
    const lines = describeProcessingFailure(failure).split("\n")
    const last = lines[lines.length - 1] ?? ""
    expect(markerSchema.parse(JSON.parse(last)).marker).toBe(PROCESSING_FAILURE_MARKER_KIND)
  })
})

function harness(opts: {
  readonly results: readonly (LatestBuild | null)[]
  readonly isTarget?: (b: LatestBuild) => boolean
  readonly timeoutMs?: number
}): { deps: PollDeps; ticks: readonly string[]; sleeps: readonly number[] } {
  const ticks: string[] = []
  const sleeps: number[] = []
  let index = 0
  let clock = 0
  const deps: PollDeps = {
    fetchLatest: () => {
      const value = opts.results[Math.min(index, opts.results.length - 1)] ?? null
      index += 1
      return Promise.resolve(value)
    },
    isTarget: opts.isTarget ?? (() => true),
    sleep: (ms) => {
      sleeps.push(ms)
      clock += ms
      return Promise.resolve()
    },
    now: () => clock,
    intervalMs: 30_000,
    timeoutMs: opts.timeoutMs ?? 30 * 60_000,
    onTick: (m) => ticks.push(m),
  }
  return { deps, ticks, sleeps }
}

describe("pollBuildUntilTerminal", () => {
  test("polls through PROCESSING until VALID", async () => {
    const { deps, sleeps } = harness({
      results: [
        build({ processingState: "PROCESSING" }),
        build({ processingState: "PROCESSING" }),
        build({ processingState: "VALID" }),
      ],
    })
    const outcome = await pollBuildUntilTerminal(deps)
    expect(outcome.kind).toBe("valid")
    if (outcome.kind === "valid") expect(outcome.build.version).toBe("5")
    expect(sleeps).toEqual([30_000, 30_000])
  })

  test("returns a typed failure on FAILED", async () => {
    const { deps } = harness({ results: [build({ processingState: "FAILED" })] })
    const outcome = await pollBuildUntilTerminal(deps)
    expect(outcome.kind).toBe("failed")
    if (outcome.kind === "failed") {
      expect(outcome.failure.failureClass).toBe("TESTFLIGHT_PROCESSING_FAILED")
    }
  })

  test("ignores a non-target (stale prior) build until our upload ingests", async () => {
    const stale = build({ id: "b-old", processingState: "VALID", version: "4" })
    const ours = build({ id: "b-new", processingState: "VALID", version: "5" })
    const { deps, ticks } = harness({
      results: [stale, stale, ours],
      isTarget: (b) => b.id === "b-new",
    })
    const outcome = await pollBuildUntilTerminal(deps)
    expect(outcome.kind).toBe("valid")
    if (outcome.kind === "valid") expect(outcome.build.version).toBe("5")
    expect(ticks.filter((t) => t.includes("waiting for the uploaded build")).length).toBe(2)
  })

  test("times out when the build never reaches a terminal state", async () => {
    const { deps } = harness({
      results: [build({ processingState: "PROCESSING" })],
      timeoutMs: 60_000,
    })
    const outcome = await pollBuildUntilTerminal(deps)
    expect(outcome.kind).toBe("timeout")
    if (outcome.kind === "timeout") expect(outcome.lastState).toBe("PROCESSING")
  })
})

describe("classifyInternalBuildState (tester visibility, #14174)", () => {
  test("READY_FOR_BETA_TESTING and IN_BETA_TESTING are visible", () => {
    expect(classifyInternalBuildState("READY_FOR_BETA_TESTING")).toBe("visible")
    expect(classifyInternalBuildState("IN_BETA_TESTING")).toBe("visible")
  })
  test("MISSING_EXPORT_COMPLIANCE / PROCESSING_EXCEPTION / EXPIRED are blocked", () => {
    expect(classifyInternalBuildState("MISSING_EXPORT_COMPLIANCE")).toBe("blocked")
    expect(classifyInternalBuildState("PROCESSING_EXCEPTION")).toBe("blocked")
    expect(classifyInternalBuildState("EXPIRED")).toBe("blocked")
  })
  test("null / PROCESSING / unknown states keep waiting", () => {
    expect(classifyInternalBuildState(null)).toBe("waiting")
    expect(classifyInternalBuildState("PROCESSING")).toBe("waiting")
    expect(classifyInternalBuildState("SOMETHING_NEW")).toBe("waiting")
  })
  test("is case/whitespace tolerant", () => {
    expect(classifyInternalBuildState(" in_beta_testing ")).toBe("visible")
  })
})

describe("visibilityFailureFor", () => {
  test("MISSING_EXPORT_COMPLIANCE names the plist key + ASC backfill remediation", () => {
    const f = visibilityFailureFor(build({ version: "8" }), "MISSING_EXPORT_COMPLIANCE")
    expect(f.failureClass).toBe("TESTFLIGHT_NOT_TESTER_VISIBLE")
    expect(f.remediation).toContain("ITSAppUsesNonExemptEncryption")
    expect(f.remediation).toContain("usesNonExemptEncryption")
    expect(f.version).toBe("8")
  })
  test("null (never appeared) degrades to a generic not-visible remediation", () => {
    const f = visibilityFailureFor(build(), null)
    expect(f.failureClass).toBe("TESTFLIGHT_NOT_TESTER_VISIBLE")
    expect(f.processingState).toBe("not yet set")
  })
  test("marker line is parseable and carries the class", () => {
    const f = visibilityFailureFor(build(), "EXPIRED")
    const markerSchema = z.object({ marker: z.string(), failureClass: z.string() }).passthrough()
    const parsed = markerSchema.parse(JSON.parse(formatProcessingFailureMarker(f)))
    expect(parsed.failureClass).toBe("TESTFLIGHT_NOT_TESTER_VISIBLE")
    expect(parsed.marker).toBe(PROCESSING_FAILURE_MARKER_KIND)
  })
})

describe("pollUntilTesterVisible", () => {
  function visDeps(states: readonly (string | null)[]): { deps: VisibilityPollDeps } {
    let i = 0
    let clock = 0
    return {
      deps: {
        fetchState: () => Promise.resolve(states[Math.min(i++, states.length - 1)] ?? null),
        sleep: () => {
          clock += 1_000
          return Promise.resolve()
        },
        now: () => clock,
        intervalMs: 1_000,
        timeoutMs: 5_000,
      },
    }
  }

  test("waits through not-yet-set then resolves visible", async () => {
    const { deps } = visDeps([null, "PROCESSING", "IN_BETA_TESTING"])
    const outcome = await pollUntilTesterVisible(deps)
    expect(outcome).toEqual({ kind: "visible", state: "IN_BETA_TESTING" })
  })

  test("a blocked state terminates immediately", async () => {
    const { deps } = visDeps(["MISSING_EXPORT_COMPLIANCE"])
    const outcome = await pollUntilTesterVisible(deps)
    expect(outcome).toEqual({ kind: "blocked", state: "MISSING_EXPORT_COMPLIANCE" })
  })

  test("times out with the last observed state", async () => {
    const { deps } = visDeps(["PROCESSING"])
    const outcome = await pollUntilTesterVisible(deps)
    expect(outcome.kind).toBe("timeout")
    if (outcome.kind === "timeout") expect(outcome.lastState).toBe("PROCESSING")
  })
})
