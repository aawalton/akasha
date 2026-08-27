import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { rruleOps } from "./rrule"

const def: PropertyDefinition = { id: "r", title: "Recurrence", type: "rrule" }

describe("rruleOps.validate", () => {
  test("accepts a daily rule with anchorFromCompletion=false", () => {
    expect(rruleOps.validate({ rule: "FREQ=DAILY", anchorFromCompletion: false }, def)).toBeNull()
  })

  test("accepts a weekly rule with anchorFromCompletion=true", () => {
    expect(
      rruleOps.validate({ rule: "FREQ=WEEKLY;BYDAY=MO", anchorFromCompletion: true }, def)
    ).toBeNull()
  })

  test("accepts null (empty value)", () => {
    expect(rruleOps.validate(null, def)).toBeNull()
  })

  test("accepts undefined (empty value)", () => {
    expect(rruleOps.validate(undefined, def)).toBeNull()
  })

  test("rejects a bare string — must be the object shape", () => {
    expect(rruleOps.validate("FREQ=DAILY", def)).not.toBeNull()
  })

  test("rejects an object missing anchorFromCompletion", () => {
    expect(rruleOps.validate({ rule: "FREQ=DAILY" }, def)).not.toBeNull()
  })

  test("rejects rule with wrong type (number)", () => {
    expect(rruleOps.validate({ rule: 123, anchorFromCompletion: false }, def)).not.toBeNull()
  })

  test("rejects anchorFromCompletion with wrong type (string)", () => {
    expect(
      rruleOps.validate({ rule: "FREQ=DAILY", anchorFromCompletion: "yes" }, def)
    ).not.toBeNull()
  })

  test("rejects an empty rule string", () => {
    expect(rruleOps.validate({ rule: "", anchorFromCompletion: false }, def)).not.toBeNull()
  })
})

describe("rruleOps.getSortValue", () => {
  test("returns null for a populated rrule object", () => {
    expect(rruleOps.getSortValue({ rule: "FREQ=DAILY", anchorFromCompletion: false })).toBeNull()
  })

  test("returns null for null", () => {
    expect(rruleOps.getSortValue(null)).toBeNull()
  })

  test("returns null for undefined", () => {
    expect(rruleOps.getSortValue(undefined)).toBeNull()
  })
})

describe("rruleOps.getFilterOperators", () => {
  test("returns is_empty and is_not_empty exactly", () => {
    expect(rruleOps.getFilterOperators(def)).toEqual([
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })
})

describe("rruleOps.getFilterPredicate", () => {
  test("is_empty returns true for null", () => {
    const pred = rruleOps.getFilterPredicate({ operator: "is_empty" }, def)
    expect(pred(null)).toBe(true)
  })

  test("is_empty returns true for undefined (absent property)", () => {
    const pred = rruleOps.getFilterPredicate({ operator: "is_empty" }, def)
    expect(pred(undefined)).toBe(true)
  })

  test("is_empty returns false for a populated rrule object", () => {
    const pred = rruleOps.getFilterPredicate({ operator: "is_empty" }, def)
    expect(pred({ rule: "FREQ=DAILY", anchorFromCompletion: false })).toBe(false)
  })

  test("is_not_empty is the inverse of is_empty for null", () => {
    const pred = rruleOps.getFilterPredicate({ operator: "is_not_empty" }, def)
    expect(pred(null)).toBe(false)
  })

  test("is_not_empty is the inverse of is_empty for undefined", () => {
    const pred = rruleOps.getFilterPredicate({ operator: "is_not_empty" }, def)
    expect(pred(undefined)).toBe(false)
  })

  test("is_not_empty returns true for a populated rrule object", () => {
    const pred = rruleOps.getFilterPredicate({ operator: "is_not_empty" }, def)
    expect(pred({ rule: "FREQ=DAILY", anchorFromCompletion: false })).toBe(true)
  })
})
