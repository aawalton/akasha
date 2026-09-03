import { expect, test } from "bun:test"
import type { Row } from "@akasha/pages-system/page-derive-shape"
import { pipelineIn, stepIn, workflowIn } from "./pipeline-row-entities.module.code.ts"

function rowOf(values: Record<string, unknown>): Row {
  return { values } as Row
}

test("a row stating no whole-number seq is no entity", () => {
  expect(pipelineIn(rowOf({ status: "running" }))).toBeNull()
  expect(pipelineIn(rowOf({ seq: "seven" }))).toBeNull()
})

test("a workflow naming no pipeline is no entity", () => {
  expect(workflowIn(rowOf({ seq: "2" }))).toBeNull()
})

test("a step naming no workflow is no entity", () => {
  expect(stepIn(rowOf({ seq: "3" }))).toBeNull()
})

test("a row stating no status stands as pending", () => {
  expect(pipelineIn(rowOf({ seq: "1" }))?.status).toBe("pending")
})

test("a value stated as whitespace alone is read as unstated", () => {
  expect(pipelineIn(rowOf({ seq: "1", branch: "   " }))?.branch).toBe("")
  expect(pipelineIn(rowOf({ seq: "1", "overtaken-by-seq": " " }))?.overtakenBySeq).toBeNull()
})

test("a workflow stating no slug is named by its seq", () => {
  expect(workflowIn(rowOf({ seq: "2", "pipeline-seq": "1" }))?.slug).toBe("2")
})

test("a step stating no title is named by its seq", () => {
  expect(stepIn(rowOf({ seq: "3", "workflow-seq": "2" }))?.title).toBe("3")
})

test("always-runs is true only where it is stated exactly so", () => {
  const at = (value: unknown): boolean =>
    workflowIn(rowOf({ seq: "2", "pipeline-seq": "1", "always-runs": value }))?.alwaysRuns ?? false
  expect(at("true")).toBe(true)
  expect(at("TRUE")).toBe(false)
  expect(at(undefined)).toBe(false)
})

test("a moment that does not parse is read as unstated rather than as zero", () => {
  const step = stepIn(rowOf({ seq: "3", "workflow-seq": "2", "dispatched-at": "whenever" }))
  expect(step?.dispatchedAt).toBeNull()
})

test("a moment that parses is read as milliseconds", () => {
  const step = stepIn(
    rowOf({ seq: "3", "workflow-seq": "2", "dispatched-at": "2026-09-03T00:00:00Z" })
  )
  expect(step?.dispatchedAt).toBe(Date.parse("2026-09-03T00:00:00Z"))
})

test("a launch-attempts that is no number counts as none", () => {
  const step = stepIn(rowOf({ seq: "3", "workflow-seq": "2", "launch-attempts": "many" }))
  expect(step?.launchAttempts).toBe(0)
})
