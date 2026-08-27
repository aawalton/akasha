import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { resolveComputedProperty } from "./resolve-computed-type"
import type { PageTypePropertiesMap } from "./rollup"

describe("resolveComputedProperty — rollup one-hop", () => {
  test("rollup -> number returns number", () => {
    const sourceTypeId = "t_source"
    const targetTypeId = "t_target"
    const types: PageTypePropertiesMap = new Map([
      [
        sourceTypeId,
        [
          {
            id: "rel",
            title: "Rel",
            type: "relation",
            config: { targetPageTypeId: targetTypeId },
          },
          {
            id: "ro",
            title: "Rollup",
            type: "rollup",
            config: { relationPropertyId: "rel", targetPropertyId: "num" },
          },
        ],
      ],
      [targetTypeId, [{ id: "num", title: "Num", type: "number", config: { min: 0 } }]],
    ])
    const def: PropertyDefinition = {
      id: "ro",
      title: "Rollup",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "num" },
    }
    const resolved = resolveComputedProperty(def, sourceTypeId, types)
    expect(resolved.type).toBe("number")
    expect(resolved.config).toEqual({ min: 0 })
    expect(resolved.id).toBe("ro")
    expect(resolved.title).toBe("Rollup")
  })

  test("rollup -> select carries the select options in config", () => {
    const sourceTypeId = "t_source"
    const targetTypeId = "t_target"
    const options = [
      { id: "o1", label: "One" },
      { id: "o2", label: "Two" },
    ]
    const types: PageTypePropertiesMap = new Map([
      [
        sourceTypeId,
        [
          {
            id: "rel",
            title: "Rel",
            type: "relation",
            config: { targetPageTypeId: targetTypeId },
          },
          {
            id: "ro",
            title: "Rollup",
            type: "rollup",
            config: { relationPropertyId: "rel", targetPropertyId: "status" },
          },
        ],
      ],
      [targetTypeId, [{ id: "status", title: "Status", type: "select", config: { options } }]],
    ])
    const def: PropertyDefinition = {
      id: "ro",
      title: "Rollup",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "status" },
    }
    const resolved = resolveComputedProperty(def, sourceTypeId, types)
    expect(resolved.type).toBe("select")
    expect(resolved.config).toEqual({ options })
  })

  test("rollup -> relation carries targetPageTypeId", () => {
    const sourceTypeId = "t_source"
    const middleTypeId = "t_middle"
    const finalTypeId = "t_final"
    const types: PageTypePropertiesMap = new Map([
      [
        sourceTypeId,
        [
          {
            id: "rel",
            title: "Rel",
            type: "relation",
            config: { targetPageTypeId: middleTypeId },
          },
          {
            id: "ro",
            title: "Rollup",
            type: "rollup",
            config: { relationPropertyId: "rel", targetPropertyId: "downstream" },
          },
        ],
      ],
      [
        middleTypeId,
        [
          {
            id: "downstream",
            title: "Downstream",
            type: "relation",
            config: { targetPageTypeId: finalTypeId },
          },
        ],
      ],
      [finalTypeId, []],
    ])
    const def: PropertyDefinition = {
      id: "ro",
      title: "Rollup",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "downstream" },
    }
    const resolved = resolveComputedProperty(def, sourceTypeId, types)
    expect(resolved.type).toBe("relation")
    expect(resolved.config).toEqual({ targetPageTypeId: finalTypeId })
  })
})

describe("resolveComputedProperty — rollup multi-hop", () => {
  test("rollup -> rollup -> number resolves to number", () => {
    const stepTypeId = "t_step"
    const workflowTypeId = "t_workflow"
    const pipelineTypeId = "t_pipeline"
    const types: PageTypePropertiesMap = new Map([
      [
        stepTypeId,
        [
          {
            id: "workflow",
            title: "Workflow",
            type: "relation",
            config: { targetPageTypeId: workflowTypeId },
          },
          {
            id: "stepPipelineNumber",
            title: "Pipeline #",
            type: "rollup",
            config: { relationPropertyId: "workflow", targetPropertyId: "pipelineNumber" },
          },
        ],
      ],
      [
        workflowTypeId,
        [
          {
            id: "pipeline",
            title: "Pipeline",
            type: "relation",
            config: { targetPageTypeId: pipelineTypeId },
          },
          {
            id: "pipelineNumber",
            title: "Pipeline #",
            type: "rollup",
            config: { relationPropertyId: "pipeline", targetPropertyId: "number" },
          },
        ],
      ],
      [pipelineTypeId, [{ id: "number", title: "Number", type: "number" }]],
    ])
    const def: PropertyDefinition = {
      id: "stepPipelineNumber",
      title: "Pipeline #",
      type: "rollup",
      config: { relationPropertyId: "workflow", targetPropertyId: "pipelineNumber" },
    }
    const resolved = resolveComputedProperty(def, stepTypeId, types)
    expect(resolved.type).toBe("number")
    expect(resolved.id).toBe("stepPipelineNumber")
  })

  test("rollup -> aggregate resolves to number", () => {
    const sourceTypeId = "t_source"
    const targetTypeId = "t_target"
    const types: PageTypePropertiesMap = new Map([
      [
        sourceTypeId,
        [
          {
            id: "rel",
            title: "Rel",
            type: "relation",
            config: { targetPageTypeId: targetTypeId },
          },
          {
            id: "ro",
            title: "Rollup",
            type: "rollup",
            config: { relationPropertyId: "rel", targetPropertyId: "total" },
          },
        ],
      ],
      [
        targetTypeId,
        [
          {
            id: "total",
            title: "Total",
            type: "aggregate",
            config: { relationPropertyId: "items", targetPropertyId: "n", function: "sum" },
          },
        ],
      ],
    ])
    const def: PropertyDefinition = {
      id: "ro",
      title: "Rollup",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "total" },
    }
    const resolved = resolveComputedProperty(def, sourceTypeId, types)
    expect(resolved.type).toBe("number")
    expect(resolved.config).toEqual({})
  })

  test("rollup targeting universal seq (when caller pre-merges universals into propertiesByPageType) resolves to number", () => {
    const sourceTypeId = "t_workflow"
    const targetTypeId = "t_pipeline"
    const seqDef: PropertyDefinition = { id: "seq", title: "Seq", type: "number", config: {} }
    const types: PageTypePropertiesMap = new Map([
      [
        sourceTypeId,
        [
          {
            id: "pipeline",
            title: "Pipeline",
            type: "relation",
            config: { targetPageTypeId: targetTypeId },
          },
        ],
      ],
      [targetTypeId, [seqDef]],
    ])
    const def: PropertyDefinition = {
      id: "pipelineNumber",
      title: "Pipeline Number",
      type: "rollup",
      config: { relationPropertyId: "pipeline", targetPropertyId: "seq" },
    }
    const resolved = resolveComputedProperty(def, sourceTypeId, types)
    expect(resolved.type).toBe("number")
    expect(resolved.id).toBe("pipelineNumber")
  })

  test("rollup -> formula (calendar-date) resolves to calendar-date", () => {
    const sourceTypeId = "t_source"
    const targetTypeId = "t_target"
    const types: PageTypePropertiesMap = new Map([
      [
        sourceTypeId,
        [
          {
            id: "rel",
            title: "Rel",
            type: "relation",
            config: { targetPageTypeId: targetTypeId },
          },
          {
            id: "ro",
            title: "Rollup",
            type: "rollup",
            config: { relationPropertyId: "rel", targetPropertyId: "dueDate" },
          },
        ],
      ],
      [
        targetTypeId,
        [
          {
            id: "dueDate",
            title: "Due Date",
            type: "formula",
            config: { expression: "today()", returnType: "calendar-date" },
          },
        ],
      ],
    ])
    const def: PropertyDefinition = {
      id: "ro",
      title: "Rollup",
      type: "rollup",
      config: { relationPropertyId: "rel", targetPropertyId: "dueDate" },
    }
    const resolved = resolveComputedProperty(def, sourceTypeId, types)
    expect(resolved.type).toBe("calendar-date")
    expect(resolved.config).toEqual({})
  })
})
