import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { resolveComputedProperty } from "./resolve-computed-type"
import type { PageTypePropertiesMap } from "./rollup"

const emptyTypes: PageTypePropertiesMap = new Map()

describe("resolveComputedProperty — formula", () => {
  const returnTypes = ["text", "number", "calendar-date", "boolean"] as const

  for (const returnType of returnTypes) {
    test(`formula returnType=${returnType} resolves to ${returnType}`, () => {
      const def: PropertyDefinition = {
        id: "f",
        title: "F",
        type: "formula",
        config: { expression: "x", returnType },
      }
      const resolved = resolveComputedProperty(def, "pt", emptyTypes)
      expect(resolved.type).toBe(returnType)
      expect(resolved.config).toEqual({})
      expect(resolved.id).toBe("f")
      expect(resolved.title).toBe("F")
    })
  }

  test("formula with missing returnType returns original unchanged", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: { expression: "x" },
    }
    expect(resolveComputedProperty(def, "pt", emptyTypes)).toBe(def)
  })

  test("formula with no config returns original unchanged", () => {
    const def: PropertyDefinition = { id: "f", title: "F", type: "formula" }
    expect(resolveComputedProperty(def, "pt", emptyTypes)).toBe(def)
  })
})

describe("resolveComputedProperty — formula number-format passthrough", () => {
  test("returnType=number carries the number-format surface into the resolved config", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: {
        expression: "x * 100",
        returnType: "number",
        format: "percent",
        decimals: 1,
        percentBasis: 100,
        min: 0,
        max: 100,
        units: "pts",
        prefix: "~",
      },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("number")
    expect(resolved.config).toEqual({
      format: "percent",
      decimals: 1,
      percentBasis: 100,
      min: 0,
      max: 100,
      units: "pts",
      prefix: "~",
    })
  })

  test("returnType=number carries only the fields explicitly present", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: { expression: "x", returnType: "number", format: "percent" },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("number")
    expect(resolved.config).toEqual({ format: "percent" })
  })

  test("non-number returnType ignores number-format fields", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: { expression: "x", returnType: "text", format: "percent", decimals: 2 },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("text")
    expect(resolved.config).toEqual({})
  })
})

describe("resolveComputedProperty — formula badge-display passthrough", () => {
  test("returnType=number carries icon and badgeVariant with the number-format surface", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: {
        expression: "x",
        returnType: "number",
        format: "compact",
        decimals: 1,
        units: "g",
        prefix: "~",
        icon: "coins",
        badgeVariant: "yellow",
      },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("number")
    expect(resolved.config).toEqual({
      format: "compact",
      decimals: 1,
      units: "g",
      prefix: "~",
      icon: "coins",
      badgeVariant: "yellow",
    })
  })

  test("returnType=text carries icon and badgeVariant but not the number-format surface", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: {
        expression: "x",
        returnType: "text",
        format: "percent",
        decimals: 2,
        icon: "tag",
        badgeVariant: "blue",
      },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("text")
    expect(resolved.config).toEqual({ icon: "tag", badgeVariant: "blue" })
  })

  test("aggregate carries icon and badgeVariant into the synthesized number config", () => {
    const def: PropertyDefinition = {
      id: "a",
      title: "A",
      type: "aggregate",
      config: {
        relationPropertyId: "rel",
        targetPropertyId: "n",
        function: "sum",
        format: "number-with-separators",
        icon: "sigma",
        badgeVariant: "green",
      },
    }
    const resolved = resolveComputedProperty(def, "pt", emptyTypes)
    expect(resolved.type).toBe("number")
    expect(resolved.config).toEqual({
      format: "number-with-separators",
      icon: "sigma",
      badgeVariant: "green",
    })
  })
})
