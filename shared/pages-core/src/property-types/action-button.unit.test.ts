import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { actionButtonOps } from "./action-button"
import { propertyTypeRendersWhenEmpty } from "./registry"

const def: PropertyDefinition = {
  id: "act",
  title: "Action",
  type: "action-button",
  config: { verbId: "test-verb" },
}

describe("actionButtonOps.validate", () => {
  test("absent value shapes are valid (null)", () => {
    expect(actionButtonOps.validate(null, def)).toBeNull()
    expect(actionButtonOps.validate(undefined, def)).toBeNull()
    expect(actionButtonOps.validate("", def)).toBeNull()
  })

  test("an object without lastInvokedAt is valid", () => {
    expect(actionButtonOps.validate({}, def)).toBeNull()
  })

  test("an object with a string lastInvokedAt is valid", () => {
    expect(actionButtonOps.validate({ lastInvokedAt: "2026-01-02T03:04:05.000Z" }, def)).toBeNull()
  })

  test("a non-string lastInvokedAt is an error", () => {
    expect(typeof actionButtonOps.validate({ lastInvokedAt: 123 }, def)).toBe("string")
    expect(typeof actionButtonOps.validate({ lastInvokedAt: true }, def)).toBe("string")
  })

  test("non-object primitive/array values are errors", () => {
    expect(typeof actionButtonOps.validate(5, def)).toBe("string")
    expect(typeof actionButtonOps.validate("hello", def)).toBe("string")
    expect(typeof actionButtonOps.validate([], def)).toBe("string")
    expect(typeof actionButtonOps.validate([1, 2], def)).toBe("string")
    expect(typeof actionButtonOps.validate(true, def)).toBe("string")
    expect(typeof actionButtonOps.validate(false, def)).toBe("string")
  })
})

describe("actionButtonOps.getSortValue", () => {
  test("object with parseable string lastInvokedAt returns the ms epoch", () => {
    const iso = "2026-01-02T03:04:05.000Z"
    const ms = Date.parse(iso)
    expect(actionButtonOps.getSortValue({ lastInvokedAt: iso })).toBe(ms)
    expect(typeof actionButtonOps.getSortValue({ lastInvokedAt: iso })).toBe("number")
  })

  test("unparseable / missing / wrong-shape values sort to null", () => {
    expect(actionButtonOps.getSortValue({ lastInvokedAt: "not-a-date" })).toBeNull()
    expect(actionButtonOps.getSortValue({ lastInvokedAt: 123 })).toBeNull()
    expect(actionButtonOps.getSortValue({})).toBeNull()
    expect(actionButtonOps.getSortValue(null)).toBeNull()
    expect(actionButtonOps.getSortValue(undefined)).toBeNull()
    expect(actionButtonOps.getSortValue("x")).toBeNull()
  })
})

describe("actionButtonOps.getFilterOperators", () => {
  test("offers exactly is_empty and is_not_empty", () => {
    expect(actionButtonOps.getFilterOperators(def)).toEqual([
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })
})

describe("actionButtonOps.getFilterPredicate", () => {
  test("is_empty is true for absent values and objects without a string lastInvokedAt", () => {
    const pred = actionButtonOps.getFilterPredicate({ operator: "is_empty" }, def)
    expect(pred(null)).toBe(true)
    expect(pred(undefined)).toBe(true)
    expect(pred("")).toBe(true)
    expect(pred({})).toBe(true)
    expect(pred({ lastInvokedAt: 5 })).toBe(true)
    expect(pred({ lastInvokedAt: "2026-01-02T03:04:05.000Z" })).toBe(false)
  })

  test("is_not_empty is the complement of is_empty", () => {
    const pred = actionButtonOps.getFilterPredicate({ operator: "is_not_empty" }, def)
    expect(pred({ lastInvokedAt: "2026-01-02T03:04:05.000Z" })).toBe(true)
    expect(pred(null)).toBe(false)
    expect(pred(undefined)).toBe(false)
    expect(pred("")).toBe(false)
    expect(pred({})).toBe(false)
  })

  test("unknown operator returns a predicate that is always true", () => {
    const pred = actionButtonOps.getFilterPredicate({ operator: "bogus" }, def)
    expect(pred(null)).toBe(true)
    expect(pred({ lastInvokedAt: "2026-01-02T03:04:05.000Z" })).toBe(true)
  })
})

describe("rendersWhenEmpty", () => {
  test("actionButtonOps declares rendersWhenEmpty true", () => {
    expect(actionButtonOps.rendersWhenEmpty).toBe(true)
  })

  test("propertyTypeRendersWhenEmpty is true only for action-button today", () => {
    expect(propertyTypeRendersWhenEmpty("action-button")).toBe(true)
    expect(propertyTypeRendersWhenEmpty("text")).toBe(false)
  })
})
