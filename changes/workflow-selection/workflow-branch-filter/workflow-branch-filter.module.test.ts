import { expect, test } from "bun:test"
import type { WorkflowConfig } from "../workflow-config/workflow-config.module.code.ts"
import { matchesBranch, selectWorkflows } from "./workflow-branch-filter.module.code.ts"

function declaring(name: string, whenBranch?: string): WorkflowConfig {
  return whenBranch === undefined ? { name, config: {} } : { name, whenBranch, config: {} }
}

test("a workflow stating no branch filter runs on every branch", () => {
  expect(matchesBranch(declaring("checks"), "main")).toBe(true)
  expect(matchesBranch(declaring("checks"), "a-branch")).toBe(true)
})

test("a branch filter of a lone star runs on every branch", () => {
  expect(matchesBranch(declaring("checks", "*"), "main")).toBe(true)
  expect(matchesBranch(declaring("checks", "*"), "a-branch")).toBe(true)
})

test("a branch filter opening with an exclamation mark refuses only the branch it names", () => {
  expect(matchesBranch(declaring("checks", "!main"), "main")).toBe(false)
  expect(matchesBranch(declaring("checks", "!main"), "a-branch")).toBe(true)
})

test("a branch filter naming a branch runs on that branch alone", () => {
  expect(matchesBranch(declaring("deploy", "main"), "main")).toBe(true)
  expect(matchesBranch(declaring("deploy", "main"), "a-branch")).toBe(false)
})

test("a pipeline stating no graph keeps every workflow the branch leaves standing", () => {
  const workflows = [declaring("checks"), declaring("deploy", "main"), declaring("draft", "!main")]

  const onMain = selectWorkflows({ workflows, changedPaths: [] }, "main")
  expect(onMain.map((wf) => wf.name)).toEqual(["checks", "deploy"])

  const onBranch = selectWorkflows({ workflows, changedPaths: [] }, "a-branch")
  expect(onBranch.map((wf) => wf.name)).toEqual(["checks", "draft"])
})
