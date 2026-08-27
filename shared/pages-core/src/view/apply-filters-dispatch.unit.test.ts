import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import {
  formulaBooleanDef,
  formulaNumberDef,
  formulaTextDef,
  multiRelationDef,
  multiSelectDef,
  numberDef,
  relationDef,
  row,
  selectDef,
  textDef,
  UNIVERSAL_DEFS,
} from "./_apply-filters-test-helpers"
import { applyFilters, testFilter } from "./apply-filters"

describe("applyFilters — formula dispatch (pre-resolved values)", () => {
  test("formula with returnType number uses strict-number-equals", () => {
    const items = [row({ f: 42 }), row({ f: "42" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "f", operator: "equals", value: 42 }],
      [formulaNumberDef]
    )
    expect(filtered.length).toBe(1)
    expect(requireFirst(filtered).f).toBe(42)
  })

  test("formula with returnType number supports gt", () => {
    const items = [row({ f: 10 }), row({ f: 3 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "f", operator: "gt", value: 5 }],
      [formulaNumberDef]
    )
    expect(filtered.length).toBe(1)
    expect(requireFirst(filtered).f).toBe(10)
  })

  test("formula text returnType delegates to text predicate", () => {
    const items = [row({ ft: "Hello" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "ft", operator: "contains", value: "ell" }],
      [formulaTextDef]
    )
    expect(filtered.length).toBe(1)
  })

  test("formula boolean returnType delegates to boolean predicate", () => {
    const items = [row({ fc: true })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "fc", operator: "equals", value: true }],
      [formulaBooleanDef]
    )
    expect(filtered.length).toBe(1)
  })
})

describe("applyFilters — universal columns dispatch", () => {
  const universals = UNIVERSAL_DEFS

  test("title equals (text, case-insensitive)", () => {
    const items = [row({ title: "Hello World", seq: 1 }), row({ title: "Other", seq: 2 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "title", operator: "equals", value: "hello world" }],
      universals
    )
    expect(filtered.length).toBe(1)
  })

  test("seq gt (number)", () => {
    const items = [row({ seq: 1 }), row({ seq: 5 }), row({ seq: 10 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "seq", operator: "gt", value: 3 }],
      universals
    )
    expect(filtered.length).toBe(2)
  })

  test("completedAt gte (number, epoch ms)", () => {
    const items = [
      row({ completedAt: 1_700_000_000_000 }),
      row({ completedAt: 1_800_000_000_000 }),
    ]
    const filtered = applyFilters(
      items,
      [{ propertyId: "completedAt", operator: "gte", value: 1_750_000_000_000 }],
      universals
    )
    expect(filtered.length).toBe(1)
  })
})

describe("applyFilters — multi-filter conjunction", () => {
  test("two filters AND together", () => {
    const items = [row({ t: "foo", n: 10 }), row({ t: "foo", n: 5 }), row({ t: "bar", n: 10 })]
    const filtered = applyFilters(
      items,
      [
        { propertyId: "t", operator: "equals", value: "foo" },
        { propertyId: "n", operator: "gte", value: 10 },
      ],
      [textDef, numberDef]
    )
    expect(filtered.length).toBe(1)
    expect(requireFirst(filtered).t).toBe("foo")
    expect(requireFirst(filtered).n).toBe(10)
  })
})

describe("applyFilters — select / multi-select / relation equality", () => {
  test("select equals", () => {
    const items = [row({ s: "a" }), row({ s: "b" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "s", operator: "equals", value: "a" }],
      [selectDef]
    )
    expect(filtered.length).toBe(1)
  })

  test("multi-select includes", () => {
    const items = [row({ ms: ["a", "b"] }), row({ ms: ["c"] })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "ms", operator: "includes", value: "a" }],
      [multiSelectDef]
    )
    expect(filtered.length).toBe(1)
  })

  test("relation equals", () => {
    const items = [row({ r: "page-1" }), row({ r: "page-2" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "r", operator: "equals", value: "page-1" }],
      [relationDef]
    )
    expect(filtered.length).toBe(1)
  })

  test("multi-relation includes", () => {
    const items = [row({ mr: ["p1", "p2"] }), row({ mr: ["p3"] })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "mr", operator: "includes", value: "p1" }],
      [multiRelationDef]
    )
    expect(filtered.length).toBe(1)
  })
})

describe("testFilter — single-value API", () => {
  test("basic text contains", () => {
    expect(
      testFilter("Hello World", { propertyId: "t", operator: "contains", value: "world" }, [
        textDef,
      ])
    ).toBe(true)
  })

  test("strict number equals", () => {
    expect(testFilter(10, { propertyId: "n", operator: "equals", value: "10" }, [numberDef])).toBe(
      false
    )
    expect(testFilter(10, { propertyId: "n", operator: "equals", value: 10 }, [numberDef])).toBe(
      true
    )
  })

  test("missing property def → returns true (row passes)", () => {
    expect(
      testFilter("foo", { propertyId: "nonexistent", operator: "equals", value: "bar" }, [textDef])
    ).toBe(true)
  })

  test("unknown operator → returns true", () => {
    expect(testFilter("x", { propertyId: "t", operator: "weird", value: "y" }, [textDef])).toBe(
      true
    )
  })
})
