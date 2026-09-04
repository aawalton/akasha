import { expect, test } from "bun:test"
import {
  analyzeFanoutLog,
  decideTriageExit,
  normalizeLogInput,
} from "./triage-fanout-log.module.code.ts"

const AT = 1_700_000_000_000

test("a log with no announce line fails rather than passing on silence", () => {
  const result = analyzeFanoutLog(["[run-workspace-tests] akasha/day: running"], AT)
  expect(result.kind).toBe("fail")
  expect(result.reason).toContain("no announce line")
  // Nothing failed; the log merely could not be read. That is exit two, not one.
  expect(decideTriageExit(result)).toBe(2)
})

test("a provably complete log with nothing failing passes", () => {
  const result = analyzeFanoutLog(
    [
      "[run-typed-tests] unit: 1 test-bearing workspace(s)",
      "[run-workspace-tests] akasha/day: running",
      " 3 pass",
      " 0 fail",
    ],
    AT
  )
  expect(result.kind).toBe("pass")
  expect(decideTriageExit(result)).toBe(0)
})

test("a refusal is a failure, because a run that executed no test proves nothing", () => {
  const result = analyzeFanoutLog(
    [
      "[run-typed-tests] unit: 1 test-bearing workspace(s)",
      "[run-typed-tests] unit: refusing a run that executed no test",
      " 0 fail",
    ],
    AT
  )
  expect(result.kind).toBe("fail")
  expect(result.reason).toContain("refusal(s)")
  expect(decideTriageExit(result)).toBe(1)
})

test("a tagged fail line is charged back to the workspace that printed it", () => {
  const result = analyzeFanoutLog(
    [
      "[run-typed-tests] unit: 2 test-bearing workspace(s)",
      "[fanout-ws:akasha/day] akasha/day/d.test.ts:",
      "[fanout-ws:akasha/day] (fail) a day is a day",
      "[fanout-ws:akasha/day]  1 fail",
    ],
    AT
  )
  expect(result.kind).toBe("fail")
  expect(result.evidence.failingWorkspaces).toContain("akasha/day")
  expect(result.evidence.failingFiles).toContain("akasha/day/d.test.ts")
})

test("a failure with no fail line to name still names a finding", () => {
  const result = analyzeFanoutLog(
    ["[run-typed-tests] unit: 1 test-bearing workspace(s)", " 2 fail"],
    AT
  )
  expect(result.kind).toBe("fail")
  if (result.kind !== "fail") throw new Error("expected a fail")
  expect(result.findings.length).toBeGreaterThan(0)
})

test("loki rows are read as rows and put back in timestamp order", () => {
  const input = [
    JSON.stringify({ timestamp: "2026-09-03T00:00:02Z", line: "second" }),
    JSON.stringify({ timestamp: "2026-09-03T00:00:01Z", line: "first" }),
  ].join("\n")
  expect(normalizeLogInput(input)).toEqual(["first", "second"])
})

test("input that is not loki rows is weighed as the plain lines it is", () => {
  expect(normalizeLogInput("one\ntwo")).toEqual(["one", "two"])
})

test("empty input is no lines at all", () => {
  expect(normalizeLogInput("   \n  ")).toEqual([])
})
