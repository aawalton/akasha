import { expect, test } from "bun:test"
import {
  renderStepCostTsv,
  type StepRun,
  summarizeRuns,
  toSeconds,
} from "./step-cost-summary.module.code.ts"

function run(durationMs: number | undefined): StepRun {
  return {
    pipelineSeq: 1,
    branch: "main",
    workflowName: "checks",
    status: "passed",
    durationMs,
    stepSeconds: toSeconds(durationMs),
    startedAt: "2026-09-03T00:00:00.000Z",
  }
}

test("a run whose duration is unknown counts among the runs and not among the timed", () => {
  const summary = summarizeRuns("checks-lint", [run(100), run(undefined), run(300)])
  expect(summary.runs).toBe(3)
  expect(summary.timedRuns).toBe(2)
})

test("a median over an even count is the mean of the two middle runs", () => {
  expect(summarizeRuns("checks-lint", [run(100), run(300)]).medianMs).toBe(200)
})

test("a median over an odd count is the middle run", () => {
  expect(summarizeRuns("checks-lint", [run(100), run(300), run(500)]).medianMs).toBe(300)
})

test("no run being timed leaves the least, the median and the most unstated", () => {
  const summary = summarizeRuns("checks-lint", [run(undefined)])
  expect(summary.minMs).toBeUndefined()
  expect(summary.medianMs).toBeUndefined()
  expect(summary.maxMs).toBeUndefined()
  expect(summary.timedRuns).toBe(0)
})

test("seconds are rounded to one place", () => {
  expect(toSeconds(1_234)).toBe(1.2)
  expect(toSeconds(undefined)).toBeUndefined()
})

test("a header line whose value is unstated is left out rather than written empty", () => {
  const lines = renderStepCostTsv(summarizeRuns("checks-lint", []), []).split("\n")
  expect(lines.map((one) => one.split("\t")[0])).toEqual(["step", "runs", "timedRuns"])
})

test("the runs follow the header after a blank line", () => {
  const runs = [run(100)]
  const lines = renderStepCostTsv(summarizeRuns("checks-lint", runs), runs).split("\n")
  expect(lines[6]).toBe("")
  expect(lines[7]).toBe("1\tmain\tchecks\tpassed\t100\t0.1\t2026-09-03T00:00:00.000Z")
})
