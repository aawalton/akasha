import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import type { PageDataJSON, PropertyDefinition } from "../types"
import { computeRollup, type PageTypePropertiesMap } from "./rollup"

describe("computeRollup chained", () => {
  const stepTypeId = "t_step"
  const workflowTypeId = "t_workflow"
  const pipelineTypeId = "t_pipeline"

  const stepProperties: readonly PropertyDefinition[] = [
    { id: "workflow", title: "Workflow", type: "relation" },
    {
      id: "workflowPipelineNumber",
      title: "Pipeline #",
      type: "rollup",
      config: { relationPropertyId: "workflow", targetPropertyId: "pipelineNumber" },
    },
  ]
  const workflowProperties: readonly PropertyDefinition[] = [
    { id: "pipeline", title: "Pipeline", type: "relation" },
    {
      id: "pipelineNumber",
      title: "Pipeline #",
      type: "rollup",
      config: { relationPropertyId: "pipeline", targetPropertyId: "number" },
    },
  ]
  const pipelineProperties: readonly PropertyDefinition[] = [
    { id: "number", title: "Number", type: "number" },
  ]

  const pageTypes: PageTypePropertiesMap = new Map([
    [stepTypeId, stepProperties],
    [workflowTypeId, workflowProperties],
    [pipelineTypeId, pipelineProperties],
  ])

  const pages = [
    {
      id: "step1",
      data: { pageTypeId: stepTypeId, workflow: "wf1" } satisfies PageDataJSON,
    },
    {
      id: "wf1",
      data: { pageTypeId: workflowTypeId, pipeline: "pl1" } satisfies PageDataJSON,
    },
    {
      id: "pl1",
      data: { pageTypeId: pipelineTypeId, number: 42 } satisfies PageDataJSON,
    },
  ]

  const emptyTypes: PageTypePropertiesMap = new Map()

  test("resolves a two-hop rollup chain (Step -> Workflow -> Pipeline.number)", () => {
    const stepData = requireFirst(pages).data
    const config = { relationPropertyId: "workflow", targetPropertyId: "pipelineNumber" }
    expect(computeRollup(config, stepData, pages, pageTypes)).toBe(42)
  })

  test("resolves a three-hop rollup chain", () => {
    const taskTypeId = "t_task"
    const taskProperties: readonly PropertyDefinition[] = [
      { id: "step", title: "Step", type: "relation" },
      {
        id: "stepPipelineNumber",
        title: "Pipeline #",
        type: "rollup",
        config: { relationPropertyId: "step", targetPropertyId: "workflowPipelineNumber" },
      },
    ]
    const extendedTypes: PageTypePropertiesMap = new Map([
      [taskTypeId, taskProperties],
      [stepTypeId, stepProperties],
      [workflowTypeId, workflowProperties],
      [pipelineTypeId, pipelineProperties],
    ])
    const taskPages = [
      { id: "task1", data: { pageTypeId: taskTypeId, step: "step1" } satisfies PageDataJSON },
      ...pages,
    ]
    const taskData = requireFirst(taskPages).data
    const config = { relationPropertyId: "step", targetPropertyId: "workflowPipelineNumber" }
    expect(computeRollup(config, taskData, taskPages, extendedTypes)).toBe(42)
  })

  test("returns null when a hop mid-chain has a null relation", () => {
    const brokenPages = [
      { id: "step1", data: { pageTypeId: stepTypeId, workflow: "wf1" } satisfies PageDataJSON },
      { id: "wf1", data: { pageTypeId: workflowTypeId } satisfies PageDataJSON },
    ]
    const stepData = requireFirst(brokenPages).data
    const config = { relationPropertyId: "workflow", targetPropertyId: "pipelineNumber" }
    expect(computeRollup(config, stepData, brokenPages, pageTypes)).toBeNull()
  })

  test("returns null when a hop mid-chain references a missing target page", () => {
    const brokenPages = [
      { id: "step1", data: { pageTypeId: stepTypeId, workflow: "wf1" } satisfies PageDataJSON },
      {
        id: "wf1",
        data: { pageTypeId: workflowTypeId, pipeline: "missing" } satisfies PageDataJSON,
      },
    ]
    const stepData = requireFirst(brokenPages).data
    const config = { relationPropertyId: "workflow", targetPropertyId: "pipelineNumber" }
    expect(computeRollup(config, stepData, brokenPages, pageTypes)).toBeNull()
  })

  test("detects a cycle between two rollups", () => {
    const typeA = "t_a"
    const typeB = "t_b"
    const typeAProps: readonly PropertyDefinition[] = [
      { id: "b", title: "B", type: "relation" },
      {
        id: "x",
        title: "X",
        type: "rollup",
        config: { relationPropertyId: "b", targetPropertyId: "y" },
      },
    ]
    const typeBProps: readonly PropertyDefinition[] = [
      { id: "a", title: "A", type: "relation" },
      {
        id: "y",
        title: "Y",
        type: "rollup",
        config: { relationPropertyId: "a", targetPropertyId: "x" },
      },
    ]
    const cycleTypes: PageTypePropertiesMap = new Map([
      [typeA, typeAProps],
      [typeB, typeBProps],
    ])
    const cyclePages = [
      { id: "pa", data: { pageTypeId: typeA, b: "pb" } satisfies PageDataJSON },
      { id: "pb", data: { pageTypeId: typeB, a: "pa" } satisfies PageDataJSON },
    ]
    const paData = requireFirst(cyclePages).data
    const config = { relationPropertyId: "b", targetPropertyId: "y" }
    expect(computeRollup(config, paData, cyclePages, cycleTypes)).toBeNull()
  })

  test("caps recursion depth at 10 hops", () => {
    const typeId = "t_chain"
    const typeProps: readonly PropertyDefinition[] = [
      { id: "next", title: "Next", type: "relation" },
      {
        id: "r",
        title: "R",
        type: "rollup",
        config: { relationPropertyId: "next", targetPropertyId: "r" },
      },
    ]
    const terminalTypeId = "t_terminal"
    const terminalProps: readonly PropertyDefinition[] = [{ id: "r", title: "R", type: "number" }]
    const depthTypes: PageTypePropertiesMap = new Map([
      [typeId, typeProps],
      [terminalTypeId, terminalProps],
    ])
    const chainPages = Array.from({ length: 12 }, (_, i) => ({
      id: `p${i}`,
      data: {
        pageTypeId: typeId,
        next: `p${i + 1}`,
      } satisfies PageDataJSON,
    }))
    chainPages.push({
      id: "p12",
      data: { pageTypeId: terminalTypeId, r: 99 } satisfies PageDataJSON,
    })
    const startData = requireFirst(chainPages).data
    const config = { relationPropertyId: "next", targetPropertyId: "r" }
    expect(computeRollup(config, startData, chainPages, depthTypes)).toBeNull()
  })

  test("falls back to direct data lookup when target page has no pageTypeId", () => {
    const untypedPages = [
      { id: "p1", data: { ref: "p2" } satisfies PageDataJSON },
      { id: "p2", data: { name: "Alice" } satisfies PageDataJSON },
    ]
    const p1Data = requireFirst(untypedPages).data
    const config = { relationPropertyId: "ref", targetPropertyId: "name" }
    expect(computeRollup(config, p1Data, untypedPages, emptyTypes)).toBe("Alice")
  })

  test("falls back to direct data lookup when target property is aggregate (not rollup)", () => {
    const typeProps: readonly PropertyDefinition[] = [
      { id: "items", title: "Items", type: "multi-relation" },
      {
        id: "total",
        title: "Total",
        type: "aggregate",
        config: { relationPropertyId: "items", targetPropertyId: "amount", function: "sum" },
      },
    ]
    const types: PageTypePropertiesMap = new Map([["t_agg", typeProps]])
    const aggPages = [
      { id: "p1", data: { ref: "p2" } satisfies PageDataJSON },
      { id: "p2", data: { pageTypeId: "t_agg" } satisfies PageDataJSON },
    ]
    const p1Data = requireFirst(aggPages).data
    const config = { relationPropertyId: "ref", targetPropertyId: "total" }
    expect(computeRollup(config, p1Data, aggPages, types)).toBeNull()
  })

  test("falls back to direct data lookup when target rollup has invalid config", () => {
    const typeProps: readonly PropertyDefinition[] = [
      { id: "ref", title: "Ref", type: "relation" },
      { id: "bad", title: "Bad", type: "rollup" },
    ]
    const types: PageTypePropertiesMap = new Map([["t", typeProps]])
    const pages = [
      { id: "p1", data: { ref: "p2" } satisfies PageDataJSON },
      { id: "p2", data: { pageTypeId: "t" } satisfies PageDataJSON },
    ]
    const p1Data = requireFirst(pages).data
    const config = { relationPropertyId: "ref", targetPropertyId: "bad" }
    expect(computeRollup(config, p1Data, pages, types)).toBeNull()
  })
})
