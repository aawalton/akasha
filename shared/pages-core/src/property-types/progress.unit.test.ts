import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { progressOps, validateProgressValue } from "./progress"

const def: PropertyDefinition = { id: "p", title: "P", type: "progress" }

describe("validateProgressValue — shape", () => {
  test("nullish values pass (optional value)", () => {
    expect(validateProgressValue(null)).toBeNull()
    expect(validateProgressValue(undefined)).toBeNull()
    expect(validateProgressValue("")).toBeNull()
  })

  test("primitives and arrays are rejected", () => {
    expect(validateProgressValue("scalar")).not.toBeNull()
    expect(validateProgressValue(5)).not.toBeNull()
    expect(validateProgressValue(true)).not.toBeNull()
    expect(validateProgressValue([])).not.toBeNull()
  })

  test("missing current/total rejected", () => {
    expect(validateProgressValue({ current: 5 })).not.toBeNull()
    expect(validateProgressValue({ total: 10 })).not.toBeNull()
    expect(validateProgressValue({})).not.toBeNull()
  })

  test("non-finite or negative numbers rejected", () => {
    expect(validateProgressValue({ current: -1, total: 10 })).not.toBeNull()
    expect(validateProgressValue({ current: 5, total: -10 })).not.toBeNull()
    expect(validateProgressValue({ current: Number.NaN, total: 10 })).not.toBeNull()
    expect(validateProgressValue({ current: Number.POSITIVE_INFINITY, total: 10 })).not.toBeNull()
    expect(validateProgressValue({ current: 5, total: Number.POSITIVE_INFINITY })).not.toBeNull()
  })

  test("scalar shape passes", () => {
    expect(validateProgressValue({ current: 5, total: 10 })).toBeNull()
    expect(validateProgressValue({ current: 0, total: 0 })).toBeNull()
    expect(validateProgressValue({ current: 10, total: 10 })).toBeNull()
  })
})

describe("validateProgressValue — entries", () => {
  test("entries as array rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        entries: [],
      })
    ).not.toBeNull()
  })

  test("entry with missing current/total/sortOrder rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: { c1: { current: 5, total: 10 } },
      })
    ).not.toBeNull()
  })

  test("entry with non-finite values rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: { c1: { current: 5, total: 10, sortOrder: Number.NaN } },
      })
    ).not.toBeNull()
  })

  test("entry with non-string label rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: { c1: { current: 5, total: 10, sortOrder: 1, label: 42 } },
      })
    ).not.toBeNull()
  })

  test("entry with valid href passes", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: {
          c1: {
            current: 5,
            total: 10,
            sortOrder: 1,
            label: "Alpha",
            href: "/completion?tab=characters&character=c1&scrollTo=mount-training",
          },
        },
      })
    ).toBeNull()
  })

  test("entry with non-string href rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: { c1: { current: 5, total: 10, sortOrder: 1, href: 42 } },
      })
    ).not.toBeNull()
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: { c1: { current: 5, total: 10, sortOrder: 1, href: null } },
      })
    ).not.toBeNull()
  })

  test("entry with empty-string href rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: { c1: { current: 5, total: 10, sortOrder: 1, href: "" } },
      })
    ).not.toBeNull()
  })
})

describe("validateProgressValue — activeEntryKey invariants", () => {
  test("activeEntryKey requires entries", () => {
    expect(validateProgressValue({ current: 5, total: 10, activeEntryKey: "ghost" })).not.toBeNull()
  })

  test("activeEntryKey referencing missing key rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "ghost",
        entries: { c1: { current: 5, total: 10, sortOrder: 1 } },
      })
    ).not.toBeNull()
  })

  test("active entry mirrors top-level current/total — passes", () => {
    expect(
      validateProgressValue({
        current: 30,
        total: 120,
        activeEntryKey: "c2",
        entries: {
          c1: { current: 15, total: 120, sortOrder: 1, label: "Aragoth" },
          c2: { current: 30, total: 120, sortOrder: 2, label: "Vesiana" },
        },
      })
    ).toBeNull()
  })

  test("active entry current mismatch rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: { c1: { current: 4, total: 10, sortOrder: 1 } },
      })
    ).not.toBeNull()
  })

  test("active entry total mismatch rejected", () => {
    expect(
      validateProgressValue({
        current: 5,
        total: 10,
        activeEntryKey: "c1",
        entries: { c1: { current: 5, total: 11, sortOrder: 1 } },
      })
    ).not.toBeNull()
  })
})

describe("validateProgressValue — entries without active", () => {
  test("every entry must satisfy current === total", () => {
    expect(
      validateProgressValue({
        current: 10,
        total: 10,
        entries: {
          c1: { current: 5, total: 10, sortOrder: 1 },
          c2: { current: 10, total: 10, sortOrder: 2 },
        },
      })
    ).not.toBeNull()
  })

  test("all entries complete passes", () => {
    expect(
      validateProgressValue({
        current: 10,
        total: 10,
        entries: {
          c1: { current: 10, total: 10, sortOrder: 1 },
          c2: { current: 10, total: 10, sortOrder: 2 },
        },
      })
    ).toBeNull()
  })
})

describe("progressOps.validate", () => {
  test("delegates to validateProgressValue", () => {
    expect(progressOps.validate(null, def)).toBeNull()
    expect(progressOps.validate({ current: 5, total: 10 }, def)).toBeNull()
    expect(progressOps.validate({ current: -1, total: 10 }, def)).not.toBeNull()
  })
})

describe("progressOps.getSortValue", () => {
  test("returns ratio when total > 0", () => {
    expect(progressOps.getSortValue({ current: 5, total: 10 })).toBe(0.5)
    expect(progressOps.getSortValue({ current: 10, total: 10 })).toBe(1)
    expect(progressOps.getSortValue({ current: 0, total: 10 })).toBe(0)
  })

  test("returns null when total === 0", () => {
    expect(progressOps.getSortValue({ current: 0, total: 0 })).toBeNull()
  })

  test("returns null for nullish or invalid value", () => {
    expect(progressOps.getSortValue(null)).toBeNull()
    expect(progressOps.getSortValue(undefined)).toBeNull()
    expect(progressOps.getSortValue("garbage")).toBeNull()
    expect(progressOps.getSortValue(42)).toBeNull()
  })
})

describe("progressOps.getFilterOperators", () => {
  test("returns the six progress operators", () => {
    const ops = progressOps.getFilterOperators(def).map((o) => o.value)
    expect([...ops].sort()).toEqual([
      "gte_percent",
      "is_complete",
      "is_empty",
      "is_incomplete",
      "is_not_empty",
      "lte_percent",
    ])
  })

  test("every operator has a non-empty label", () => {
    for (const op of progressOps.getFilterOperators(def)) {
      expect(op.label.length).toBeGreaterThan(0)
    }
  })
})

describe("progressOps.getFilterPredicate", () => {
  const v = (current: number, total: number) => ({ current, total })

  test("is_empty / is_not_empty match nullish", () => {
    const empty = progressOps.getFilterPredicate({ operator: "is_empty", value: null }, def)
    expect(empty(null)).toBe(true)
    expect(empty(undefined)).toBe(true)
    expect(empty(v(5, 10))).toBe(false)
    const notEmpty = progressOps.getFilterPredicate({ operator: "is_not_empty", value: null }, def)
    expect(notEmpty(null)).toBe(false)
    expect(notEmpty(v(5, 10))).toBe(true)
  })

  test("is_complete requires current >= total > 0", () => {
    const pred = progressOps.getFilterPredicate({ operator: "is_complete", value: null }, def)
    expect(pred(v(10, 10))).toBe(true)
    expect(pred(v(11, 10))).toBe(true)
    expect(pred(v(5, 10))).toBe(false)
    expect(pred(v(0, 0))).toBe(false)
    expect(pred(null)).toBe(false)
  })

  test("is_incomplete requires total > 0 and current < total", () => {
    const pred = progressOps.getFilterPredicate({ operator: "is_incomplete", value: null }, def)
    expect(pred(v(5, 10))).toBe(true)
    expect(pred(v(10, 10))).toBe(false)
    expect(pred(v(0, 0))).toBe(false)
    expect(pred(null)).toBe(false)
  })

  test("gte_percent uses 0–100 filter value against current/total*100", () => {
    const pred = progressOps.getFilterPredicate({ operator: "gte_percent", value: 50 }, def)
    expect(pred(v(5, 10))).toBe(true)
    expect(pred(v(4, 10))).toBe(false)
    expect(pred(v(10, 10))).toBe(true)
    expect(pred(v(0, 0))).toBe(false)
    expect(pred(null)).toBe(false)
  })

  test("lte_percent uses 0–100 filter value against current/total*100", () => {
    const pred = progressOps.getFilterPredicate({ operator: "lte_percent", value: 50 }, def)
    expect(pred(v(5, 10))).toBe(true)
    expect(pred(v(6, 10))).toBe(false)
    expect(pred(v(0, 10))).toBe(true)
    expect(pred(v(0, 0))).toBe(false)
    expect(pred(null)).toBe(false)
  })

  test("unknown operator returns true (no-op)", () => {
    const pred = progressOps.getFilterPredicate({ operator: "wat", value: null }, def)
    expect(pred(v(5, 10))).toBe(true)
  })
})
