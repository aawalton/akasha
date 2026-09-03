import { expect, test } from "bun:test"
import {
  computeDurationMs,
  formatStepRow,
  type StepProjection,
} from "./step-row-format.module.code.ts"

const NOTHING: StepProjection = {
  workflowName: "checks",
  stepName: "checks-lint",
  status: "passed",
  exitCode: undefined,
  durationMs: undefined,
  podName: undefined,
  startedAt: undefined,
  completedAt: undefined,
  failReason: undefined,
  skipReason: undefined,
  admissionRejectedReason: undefined,
  blockedBy: undefined,
  infraSignatureClass: undefined,
  dispatchWaitReason: undefined,
  dispatchWaitNode: undefined,
  dispatchWaitSince: undefined,
}

test("a duration is stated only where both ends are known and readable", () => {
  expect(computeDurationMs("2026-09-03T00:00:00Z", "2026-09-03T00:00:10Z")).toBe(10_000)
  expect(computeDurationMs(undefined, "2026-09-03T00:00:10Z")).toBeUndefined()
  expect(computeDurationMs("not a moment", "2026-09-03T00:00:10Z")).toBeUndefined()
})

test("an age under a minute is stated in seconds and above it in minutes and hours", () => {
  const cells = (durationMs: number): string =>
    formatStepRow({ ...NOTHING, durationMs }, 0).split("\t")[4] ?? ""
  expect(cells(45_000)).toBe("45s")
  expect(cells(150_000)).toBe("2m")
  expect(cells(3_780_000)).toBe("1h3m")
})

test("one reason is written, the failure standing ahead of the skip", () => {
  const row = formatStepRow({ ...NOTHING, failReason: "boom", skipReason: "when-unmet" }, 0)
  expect(row.split("\t")[7]).toBe("boom")
})

test("a reason is written on one line, whatever it held", () => {
  const row = formatStepRow({ ...NOTHING, failReason: "  two\n  lines  " }, 0)
  expect(row.split("\t")[7]).toBe("two lines")
})

test("a wait is aged against the step's own end where it has one", () => {
  const row = formatStepRow(
    {
      ...NOTHING,
      dispatchWaitReason: "no-capacity",
      dispatchWaitNode: "node-a",
      dispatchWaitSince: Date.parse("2026-09-03T00:00:00Z"),
      completedAt: "2026-09-03T00:00:30Z",
    },
    Date.parse("2026-09-03T09:00:00Z")
  )
  expect(row.split("\t")[6]).toBe("no-capacity@node-a (30s)")
})

test("no wait reason leaves the wait cell empty", () => {
  expect(formatStepRow(NOTHING, 0).split("\t")[6]).toBe("")
})
