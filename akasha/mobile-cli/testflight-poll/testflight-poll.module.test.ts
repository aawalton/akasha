import { describe, expect, test } from "bun:test"
import { z } from "zod"
import type { LatestBuild } from "../asc-client/asc-client.module.code.ts"
import {
  classifyInternalBuildState,
  classifyProcessingState,
  describeProcessingFailure,
  formatProcessingFailureMarker,
  NOT_YET_LISTED,
  POLL_READ_FAILURE_TOLERANCE,
  type PollDeps,
  PROCESSING_FAILURE_MARKER_KIND,
  pollBuildUntilTerminal,
  pollElapsed,
  pollUntilTesterVisible,
  processingFailureFor,
  type VisibilityPollDeps,
  visibilityFailureFor,
} from "./testflight-poll.module.code.ts"

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
  readonly results: readonly (LatestBuild | null | Error)[]
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
      return value instanceof Error ? Promise.reject(value) : Promise.resolve(value)
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
    const waiting = ticks.filter((t) => t.includes(NOT_YET_LISTED) && !t.includes("\u2192"))
    expect(waiting.length).toBe(2)
    expect(ticks.at(-1)).toContain("finished processing")
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

describe("pollElapsed", () => {
  test("says seconds under a minute and minutes-and-seconds over one", () => {
    expect(pollElapsed(0)).toBe("0s")
    expect(pollElapsed(45_000)).toBe("45s")
    expect(pollElapsed(60_000)).toBe("1m00s")
    expect(pollElapsed(30 * 60_000)).toBe("30m00s")
  })

  test("a negative elapsed reads as zero rather than as a negative time", () => {
    expect(pollElapsed(-5_000)).toBe("0s")
  })
})

describe("a poll outliving a transient App Store Connect read failure", () => {
  test("one failed read is retried at the next interval rather than thrown", async () => {
    const { deps, ticks } = harness({
      results: [new Error("ECONNRESET"), build({ processingState: "VALID" })],
    })
    const outcome = await pollBuildUntilTerminal(deps)
    expect(outcome.kind).toBe("valid")
    expect(ticks.some((t) => t.includes("could not read App Store Connect"))).toBe(true)
    expect(ticks.some((t) => t.includes("ECONNRESET"))).toBe(true)
  })

  test("a retry tick says which of the tolerated failures this one is", async () => {
    const { deps, ticks } = harness({
      results: [new Error("ECONNRESET"), build({ processingState: "VALID" })],
    })
    await pollBuildUntilTerminal(deps)
    expect(ticks[0]).toContain(`1/${String(POLL_READ_FAILURE_TOLERANCE)}`)
  })

  test("failures in a row up to the tolerance raise the error, so a dead key is still loud", () => {
    const { deps } = harness({ results: [new Error("401 Unauthorized")] })
    expect(pollBuildUntilTerminal(deps)).rejects.toThrow("401 Unauthorized")
  })

  test("a read that answers resets the count, so scattered failures never accumulate", async () => {
    const { deps } = harness({
      results: [
        new Error("blip one"),
        new Error("blip two"),
        build({ processingState: "PROCESSING" }),
        new Error("blip three"),
        new Error("blip four"),
        build({ processingState: "VALID" }),
      ],
    })
    const outcome = await pollBuildUntilTerminal(deps)
    expect(outcome.kind).toBe("valid")
  })

  test("the visibility poll outlives a transient beta-detail read failure too", async () => {
    let index = 0
    let clock = 0
    const results: readonly (string | null | Error)[] = [new Error("ETIMEDOUT"), "IN_BETA_TESTING"]
    const ticks: string[] = []
    const deps: VisibilityPollDeps = {
      fetchState: () => {
        const value = results[Math.min(index, results.length - 1)] ?? null
        index += 1
        return value instanceof Error ? Promise.reject(value) : Promise.resolve(value)
      },
      sleep: () => {
        clock += 1_000
        return Promise.resolve()
      },
      now: () => clock,
      intervalMs: 1_000,
      timeoutMs: 60_000,
      onTick: (m) => ticks.push(m),
    }
    const outcome = await pollUntilTesterVisible(deps)
    expect(outcome).toEqual({ kind: "visible", state: "IN_BETA_TESTING" })
    expect(ticks.some((t) => t.includes("could not read the build's beta detail"))).toBe(true)
  })

  test("the visibility poll raises once the failures in a row reach the tolerance", () => {
    let clock = 0
    const deps: VisibilityPollDeps = {
      fetchState: () => Promise.reject(new Error("403 Forbidden")),
      sleep: () => {
        clock += 1_000
        return Promise.resolve()
      },
      now: () => clock,
      intervalMs: 1_000,
      timeoutMs: 60_000,
    }
    expect(pollUntilTesterVisible(deps)).rejects.toThrow("403 Forbidden")
  })
})
