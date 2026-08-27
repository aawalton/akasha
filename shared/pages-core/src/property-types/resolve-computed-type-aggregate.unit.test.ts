import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { resolveComputedProperty } from "./resolve-computed-type"
import type { PageTypePropertiesMap } from "./rollup"

const emptyTypes: PageTypePropertiesMap = new Map()

describe("resolveComputedProperty — aggregate", () => {
  test("resolves to { type: number, config: {} }", () => {
    const def: PropertyDefinition = {
      id: "a",
      title: "Total",
      type: "aggregate",
      config: { relationPropertyId: "items", targetPropertyId: "amount", function: "sum" },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("number")
    expect(resolved.config).toEqual({})
    expect(resolved.id).toBe("a")
    expect(resolved.title).toBe("Total")
  })

  test("carries the number-format surface (format/decimals/round) into the resolved config", () => {
    const def: PropertyDefinition = {
      id: "wealthPoints",
      title: "Wealth Points",
      type: "aggregate",
      config: {
        relationPropertyId: "sessions",
        targetPropertyId: "wealthPoints",
        function: "sum",
        format: "number-with-separators",
        decimals: 0,
        round: "floor",
      },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("number")
    expect(resolved.config).toEqual({
      format: "number-with-separators",
      decimals: 0,
      round: "floor",
    })
  })
})
