import { describe, expect, test } from "bun:test"
import type { ReadonlyJSONValue } from "../schema/pages"
import type { FilterableRow } from "./apply-filters"
import { applySearch } from "./apply-search"

function row(data: Record<string, ReadonlyJSONValue>): FilterableRow {
  return data
}

function at<T>(array: readonly T[], index: number): T {
  const value = array[index]
  if (value === undefined) throw new Error(`expected element at index ${index}`)
  return value
}

describe("applySearch — basic match", () => {
  test("items with matching search term are returned", () => {
    const items = [row({ title: "Hello World" }), row({ title: "goodbye" })]
    const result = applySearch(items, "Hello", "title")
    expect(result.length).toBe(1)
    expect(at(result, 0).title).toBe("Hello World")
  })
})

describe("applySearch — no match", () => {
  test("items without matching search term are excluded", () => {
    const items = [row({ title: "foo" }), row({ title: "bar" })]
    const result = applySearch(items, "baz", "title")
    expect(result.length).toBe(0)
  })
})

describe("applySearch — case insensitivity", () => {
  test("uppercase search matches lowercase data", () => {
    const items = [row({ title: "abc" })]
    const result = applySearch(items, "ABC", "title")
    expect(result.length).toBe(1)
  })

  test("lowercase search matches uppercase data", () => {
    const items = [row({ title: "ABC" })]
    const result = applySearch(items, "abc", "title")
    expect(result.length).toBe(1)
  })

  test("mixed case search matches mixed case data", () => {
    const items = [row({ title: "HeLLo WoRLd" })]
    const result = applySearch(items, "hello world", "title")
    expect(result.length).toBe(1)
  })
})

describe("applySearch — empty search string", () => {
  test("empty string returns all items unchanged", () => {
    const items = [row({ title: "a" }), row({ title: "b" })]
    const result = applySearch(items, "", "title")
    expect(result.length).toBe(2)
    expect(at(result, 0).title).toBe("a")
    expect(at(result, 1).title).toBe("b")
  })

  test("empty search returns a fresh copy (not the same reference)", () => {
    const items = [row({ title: "a" })]
    const result = applySearch(items, "", "title")
    expect(result).not.toBe(items)
  })
})

describe("applySearch — undefined/null field values", () => {
  test("null field value does not crash, coerced to empty string", () => {
    const items = [row({ title: null })]
    const result = applySearch(items, "x", "title")
    expect(result.length).toBe(0)
  })

  test("undefined field value (missing key) does not crash", () => {
    const items = [row({})]
    const result = applySearch(items, "x", "title")
    expect(result.length).toBe(0)
  })

  test("null field value passes when search is empty", () => {
    const items = [row({ title: null })]
    const result = applySearch(items, "", "title")
    expect(result.length).toBe(1)
  })
})

describe("applySearch — special characters", () => {
  test("parentheses in search string", () => {
    const items = [row({ title: "foo (bar)" }), row({ title: "baz" })]
    const result = applySearch(items, "(bar)", "title")
    expect(result.length).toBe(1)
    expect(at(result, 0).title).toBe("foo (bar)")
  })

  test("brackets in search string", () => {
    const items = [row({ title: "[tag]" }), row({ title: "plain" })]
    const result = applySearch(items, "[tag]", "title")
    expect(result.length).toBe(1)
  })

  test("dots in search string", () => {
    const items = [row({ title: "file.txt" }), row({ title: "filetxt" })]
    const result = applySearch(items, "e.t", "title")
    expect(result.length).toBe(1)
    expect(at(result, 0).title).toBe("file.txt")
  })
})

describe("applySearch — empty items array", () => {
  test("empty array returns empty result", () => {
    const result = applySearch([], "anything", "title")
    expect(result.length).toBe(0)
  })
})

describe("applySearch — multiple matches preserve order", () => {
  test("all matches returned in original order", () => {
    const items = [
      row({ title: "alpha foo" }),
      row({ title: "beta" }),
      row({ title: "gamma foo" }),
      row({ title: "delta foo" }),
    ]
    const result = applySearch(items, "foo", "title")
    expect(result.length).toBe(3)
    expect(at(result, 0).title).toBe("alpha foo")
    expect(at(result, 1).title).toBe("gamma foo")
    expect(at(result, 2).title).toBe("delta foo")
  })
})

describe("applySearch — partial matches", () => {
  test("substring match works", () => {
    const items = [row({ title: "foobar" }), row({ title: "bazfoo" }), row({ title: "nope" })]
    const result = applySearch(items, "foo", "title")
    expect(result.length).toBe(2)
    expect(at(result, 0).title).toBe("foobar")
    expect(at(result, 1).title).toBe("bazfoo")
  })
})

describe("applySearch — missing search field", () => {
  test("field not present in data → no crash, no match", () => {
    const items = [row({ title: "hello" })]
    const result = applySearch(items, "hello", "nonexistent")
    expect(result.length).toBe(0)
  })
})

describe("applySearch — preserves row shape", () => {
  test("extra properties on rows are maintained through filter", () => {
    type ExtendedRow = FilterableRow & {
      readonly _id: string
      readonly extra: number
    }
    const items: ExtendedRow[] = [
      { _id: "1", extra: 42, title: "match" },
      { _id: "2", extra: 99, title: "nope" },
    ]
    const result = applySearch(items, "match", "title")
    expect(result.length).toBe(1)
    expect(at(result, 0)._id).toBe("1")
    expect(at(result, 0).extra).toBe(42)
  })
})
