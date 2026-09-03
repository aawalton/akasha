import { expect, test } from "bun:test"
import {
  ANSWERED_ELSEWHERE,
  DISPATCHING,
  overtakenByNewerOnBranch,
  PASSED,
  PENDING,
  PIPELINE_TERMINAL,
  RUNNING,
  STEP_TERMINAL,
  UNDERWAY,
  WORKFLOW_NEGATIVE,
  WORKFLOW_TERMINAL,
} from "./pipeline-page-statuses.module.code.ts"

test("a workflow answered elsewhere counts against the pipeline holding it", () => {
  expect(WORKFLOW_NEGATIVE.has(ANSWERED_ELSEWHERE)).toBe(true)
})

test("a pipeline settles on fewer statuses than a workflow or a step", () => {
  expect(PIPELINE_TERMINAL.has("blocked")).toBe(false)
  expect(WORKFLOW_TERMINAL.has("blocked")).toBe(true)
  expect(STEP_TERMINAL.has("blocked")).toBe(true)
})

test("dispatching and running are the statuses counted as underway", () => {
  expect([...UNDERWAY].sort()).toEqual([DISPATCHING, RUNNING])
})

test("a pipeline off main is overtaken by a newer one whatever it was doing", () => {
  expect(overtakenByNewerOnBranch("feature", RUNNING)).toBe(true)
  expect(overtakenByNewerOnBranch("feature", PENDING)).toBe(true)
})

test("a pipeline on main is overtaken only while it is still pending", () => {
  expect(overtakenByNewerOnBranch("main", PENDING)).toBe(true)
  expect(overtakenByNewerOnBranch("main", RUNNING)).toBe(false)
})

test("a settled pipeline is never overtaken", () => {
  expect(overtakenByNewerOnBranch("feature", PASSED)).toBe(false)
  expect(overtakenByNewerOnBranch("main", PASSED)).toBe(false)
})

test('no set here states "canceled", which is what parts it from the selector vocabulary', () => {
  for (const set of [PIPELINE_TERMINAL, WORKFLOW_TERMINAL, STEP_TERMINAL]) {
    expect(set.has("canceled")).toBe(false)
  }
})
