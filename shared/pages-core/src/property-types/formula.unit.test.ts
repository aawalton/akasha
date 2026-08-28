import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types.ts"
import { formulaOps } from "./formula.ts"

const numberFormula: PropertyDefinition = {
  id: "f",
  title: "F",
  type: "formula",
  config: { expression: "1+1", returnType: "number" },
}

const booleanFormula: PropertyDefinition = {
  id: "f",
  title: "F",
  type: "formula",
  config: { expression: "true", returnType: "boolean" },
}

const dateFormula: PropertyDefinition = {
  id: "f",
  title: "F",
  type: "formula",
  config: { expression: "today()", returnType: "calendar-date" },
}

const textFormula: PropertyDefinition = {
  id: "f",
  title: "F",
  type: "formula",
  config: { expression: "'x'", returnType: "text" },
}

const noConfigFormula: PropertyDefinition = {
  id: "f",
  title: "F",
  type: "formula",
}

describe("formulaOps.validate", () => {
  test("returns null for all inputs", () => {
    expect(formulaOps.validate(null, numberFormula)).toBeNull()
    expect(formulaOps.validate(42, numberFormula)).toBeNull()
    expect(formulaOps.validate("hello", numberFormula)).toBeNull()
    expect(formulaOps.validate(undefined, numberFormula)).toBeNull()
  })
})

describe("formulaOps.getSortValue", () => {
  test("null returns null", () => {
    expect(formulaOps.getSortValue(null)).toBeNull()
  })

  test("undefined returns null", () => {
    expect(formulaOps.getSortValue(undefined)).toBeNull()
  })

  test("numeric value returns number", () => {
    expect(formulaOps.getSortValue(42)).toBe(42)
  })

  test("numeric string returns number", () => {
    expect(formulaOps.getSortValue("42")).toBe(42)
  })

  test("non-numeric string returns string", () => {
    expect(formulaOps.getSortValue("hello")).toBe("hello")
  })

  test("boolean returns string representation", () => {
    expect(formulaOps.getSortValue(true)).toBe(1)
    expect(formulaOps.getSortValue(false)).toBe(0)
  })
})

describe("formulaOps.getFilterOperators", () => {
  test("returns is_empty and is_not_empty", () => {
    expect(formulaOps.getFilterOperators(numberFormula)).toEqual([
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })
})

describe("formulaOps.getFilterPredicate — number returnType", () => {
  test("equals match", () => {
    const pred = formulaOps.getFilterPredicate({ operator: "equals", value: 42 }, numberFormula)
    expect(pred(42)).toBe(true)
    expect(pred(99)).toBe(false)
  })

  test("gt comparison", () => {
    const pred = formulaOps.getFilterPredicate({ operator: "gt", value: 5 }, numberFormula)
    expect(pred(10)).toBe(true)
    expect(pred(3)).toBe(false)
  })
})

describe("formulaOps.getFilterPredicate — boolean returnType", () => {
  test("equals true matches truthy values", () => {
    const pred = formulaOps.getFilterPredicate({ operator: "equals", value: true }, booleanFormula)
    expect(pred(true)).toBe(true)
    expect(pred(1)).toBe(true)
    expect(pred("x")).toBe(true)
    expect(pred(false)).toBe(false)
    expect(pred(null)).toBe(false)
  })

  test("equals false matches falsy values", () => {
    const pred = formulaOps.getFilterPredicate({ operator: "equals", value: false }, booleanFormula)
    expect(pred(false)).toBe(true)
    expect(pred(null)).toBe(true)
    expect(pred(0)).toBe(true)
    expect(pred(undefined)).toBe(true)
    expect(pred(true)).toBe(false)
  })

  test("not_equals inverts the result", () => {
    const pred = formulaOps.getFilterPredicate(
      { operator: "not_equals", value: true },
      booleanFormula
    )
    expect(pred(false)).toBe(true)
    expect(pred(null)).toBe(true)
    expect(pred(true)).toBe(false)
  })
})

describe("formulaOps.getFilterPredicate — calendar-date returnType", () => {
  test("equals match", () => {
    const pred = formulaOps.getFilterPredicate(
      { operator: "equals", value: "2026-01-15" },
      dateFormula
    )
    expect(pred("2026-01-15")).toBe(true)
    expect(pred("2026-01-16")).toBe(false)
  })

  test("gt comparison", () => {
    const pred = formulaOps.getFilterPredicate({ operator: "gt", value: "2026-01-01" }, dateFormula)
    expect(pred("2026-06-01")).toBe(true)
    expect(pred("2025-12-31")).toBe(false)
  })

  test("is_empty on null", () => {
    const pred = formulaOps.getFilterPredicate({ operator: "is_empty" }, dateFormula)
    expect(pred(null)).toBe(true)
    expect(pred("")).toBe(true)
    expect(pred("2026-01-15")).toBe(false)
  })

  test("is_not_empty on value", () => {
    const pred = formulaOps.getFilterPredicate({ operator: "is_not_empty" }, dateFormula)
    expect(pred("2026-01-15")).toBe(true)
    expect(pred(null)).toBe(false)
  })
})

describe("formulaOps.getFilterPredicate — text returnType (default)", () => {
  test("contains match", () => {
    const pred = formulaOps.getFilterPredicate({ operator: "contains", value: "ell" }, textFormula)
    expect(pred("hello")).toBe(true)
    expect(pred("world")).toBe(false)
  })
})

describe("formulaOps.getFilterPredicate — fallback to text", () => {
  test("no config falls back to text predicate", () => {
    const pred = formulaOps.getFilterPredicate(
      { operator: "contains", value: "ell" },
      noConfigFormula
    )
    expect(pred("hello")).toBe(true)
    expect(pred("world")).toBe(false)
  })

  test("invalid config falls back to text predicate", () => {
    const badConfig: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: { expression: 123, returnType: "invalid" },
    }
    const pred = formulaOps.getFilterPredicate({ operator: "contains", value: "ell" }, badConfig)
    expect(pred("hello")).toBe(true)
  })
})
