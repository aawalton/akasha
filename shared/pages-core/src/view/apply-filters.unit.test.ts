import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import {
  booleanDef,
  dateDef,
  jsonDef,
  numberDef,
  row,
  textDef,
} from "./_apply-filters-test-helpers"
import { applyFilters } from "./apply-filters"

describe("applyFilters — text contains / not_contains", () => {
  test("contains is case-insensitive substring", () => {
    const items = [row({ t: "Hello World" }), row({ t: "goodbye" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "t", operator: "contains", value: "hello" }],
      [textDef]
    )
    expect(filtered.length).toBe(1)
    expect(requireFirst(filtered).t).toBe("Hello World")
  })

  test("not_contains excludes matches", () => {
    const items = [row({ t: "foo" }), row({ t: "bar" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "t", operator: "not_contains", value: "foo" }],
      [textDef]
    )
    expect(filtered.length).toBe(1)
    expect(requireFirst(filtered).t).toBe("bar")
  })
})

describe("applyFilters — number equals is strict-by-type (user override)", () => {
  test("'10' equals 10 → false (strict, no coercion)", () => {
    const items = [row({ n: "10" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "n", operator: "equals", value: 10 }],
      [numberDef]
    )
    expect(filtered.length).toBe(0)
  })

  test("10 equals 10 → true", () => {
    const items = [row({ n: 10 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "n", operator: "equals", value: 10 }],
      [numberDef]
    )
    expect(filtered.length).toBe(1)
  })

  test("10 equals '10' (filter value is string) → false", () => {
    const items = [row({ n: 10 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "n", operator: "equals", value: "10" }],
      [numberDef]
    )
    expect(filtered.length).toBe(0)
  })

  test("gt/lt still coerce (comparison ops, not identity)", () => {
    const items = [row({ n: "6" }), row({ n: "4" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "n", operator: "gt", value: 5 }],
      [numberDef]
    )
    expect(filtered.length).toBe(1)
    expect(requireFirst(filtered).n).toBe("6")
  })
})

describe("applyFilters — text equals case-insensitive", () => {
  test("HELLO equals hello → true", () => {
    const items = [row({ t: "HELLO" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "t", operator: "equals", value: "hello" }],
      [textDef]
    )
    expect(filtered.length).toBe(1)
  })
})

describe("applyFilters — boolean equals truthy coercion", () => {
  test("1 equals true → true", () => {
    const items = [row({ c: 1 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "c", operator: "equals", value: true }],
      [booleanDef]
    )
    expect(filtered.length).toBe(1)
  })

  test("null equals false → true (both falsy)", () => {
    const items = [row({ c: null })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "c", operator: "equals", value: false }],
      [booleanDef]
    )
    expect(filtered.length).toBe(1)
  })
})

describe("applyFilters — calendar-date YYYY-MM-DD lexical compare", () => {
  test("2026-01-15 gte 2026-01-01 → true (fixes latent server bug)", () => {
    const items = [row({ d: "2026-01-15" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "d", operator: "gte", value: "2026-01-01" }],
      [dateDef]
    )
    expect(filtered.length).toBe(1)
  })

  test("2025-12-31 gt 2026-01-01 → false", () => {
    const items = [row({ d: "2025-12-31" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "d", operator: "gt", value: "2026-01-01" }],
      [dateDef]
    )
    expect(filtered.length).toBe(0)
  })

  test("non-string value yields false for comparison", () => {
    const items = [row({ d: null })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "d", operator: "gt", value: "2026-01-01" }],
      [dateDef]
    )
    expect(filtered.length).toBe(0)
  })
})

describe("applyFilters — number comparison coerces both sides", () => {
  test("gte handles numeric string", () => {
    const items = [row({ n: 5 }), row({ n: 10 }), row({ n: 4 })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "n", operator: "gte", value: "5" }],
      [numberDef]
    )
    expect(filtered.length).toBe(2)
  })

  test("null on either side fails all comparisons", () => {
    const items = [row({ n: null })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "n", operator: "gt", value: 5 }],
      [numberDef]
    )
    expect(filtered.length).toBe(0)
  })
})

describe("applyFilters — json is_empty", () => {
  test("{}, [], null, undefined, '' all count as empty", () => {
    const items = [
      row({ j: {} }),
      row({ j: [] }),
      row({ j: null }),
      row({}),
      row({ j: "" }),
      row({ j: { a: 1 } }),
    ]
    const filtered = applyFilters(items, [{ propertyId: "j", operator: "is_empty" }], [jsonDef])
    expect(filtered.length).toBe(5)
  })
})

describe("applyFilters — missing property definition", () => {
  test("row passes when def is missing", () => {
    const items = [row({ t: "foo" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "nonexistent", operator: "equals", value: "bar" }],
      [textDef]
    )
    expect(filtered.length).toBe(1)
  })
})

describe("applyFilters — unknown operator", () => {
  test("filter is no-op (row passes)", () => {
    const items = [row({ t: "foo" })]
    const filtered = applyFilters(
      items,
      [{ propertyId: "t", operator: "weird_op", value: "anything" }],
      [textDef]
    )
    expect(filtered.length).toBe(1)
  })
})
