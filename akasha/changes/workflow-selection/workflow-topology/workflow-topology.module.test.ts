import { expect, test } from "bun:test"
import type {
  AbsorbedWorkflow,
  WorkflowConfig,
} from "../workflow-config/workflow-config.module.code.ts"
import {
  isMergedGraphAcyclic,
  topologicallySortWorkflows,
} from "./workflow-topology.module.code.ts"

function declaring(name: string, dependsOn?: readonly string[]): WorkflowConfig {
  return dependsOn === undefined ? { name, config: {} } : { name, dependsOn, config: {} }
}

function carriedOver(name: string, dependsOn?: readonly string[]): AbsorbedWorkflow {
  return {
    workflow: {
      id: `w-${name}`,
      pipelineId: "p-old",
      pipelineSeq: 1,
      status: "running",
      name,
    },
    fromPipeline: { id: "p-old", seq: 1, status: "running", branch: "main" },
    config: dependsOn === undefined ? {} : { dependsOn: [...dependsOn] },
  }
}

test("a workflow stands after every selected workflow it depends on", () => {
  const sorted = topologicallySortWorkflows([
    declaring("deploy", ["checks"]),
    declaring("checks", ["build"]),
    declaring("build"),
  ])
  expect(sorted.map((wf) => wf.name)).toEqual(["build", "checks", "deploy"])
})

test("a dependency on a workflow that was not selected is passed over", () => {
  const sorted = topologicallySortWorkflows([declaring("deploy", ["never-selected"])])
  expect(sorted.map((wf) => wf.name)).toEqual(["deploy"])
})

test("workflows free to run stand in the order they were declared in", () => {
  const sorted = topologicallySortWorkflows([declaring("c"), declaring("a"), declaring("b")])
  expect(sorted.map((wf) => wf.name)).toEqual(["c", "a", "b"])
})

test("a cycle among the selected workflows throws and names the ring", () => {
  expect(() => topologicallySortWorkflows([declaring("a", ["b"]), declaring("b", ["a"])])).toThrow(
    /cycle in selected workflow dependsOn/
  )
})

test("carrying a workflow over that closes no ring leaves an order possible", () => {
  expect(isMergedGraphAcyclic([declaring("checks")], [carriedOver("lint", ["checks"])])).toBe(true)
})

test("carrying a workflow over that closes a ring leaves no order possible", () => {
  expect(
    isMergedGraphAcyclic([declaring("checks", ["lint"])], [carriedOver("lint", ["checks"])])
  ).toBe(false)
})

test("a carried-over dependency that is no list of strings is read as no dependency", () => {
  const bad = carriedOver("lint")
  bad.config.dependsOn = [1, 2]
  expect(isMergedGraphAcyclic([declaring("checks")], [bad])).toBe(true)
})
