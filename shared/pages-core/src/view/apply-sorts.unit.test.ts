import { describe, expect, test } from "bun:test"
import type { ViewSort } from "../schema/view-data"
import type { ReadonlyJSONValue } from "../schema/pages"
import type { FilterableRow } from "./apply-filters"
import { applySorts } from "./apply-sorts"

type TestRow = FilterableRow & {
  readonly _id: string
}

function row(id: string, data: Record<string, ReadonlyJSONValue>): TestRow {
  return { ...data, _id: id }
}

describe("applySorts — empty sorts", () => {
  test("undefined sorts returns a fresh copy of items", () => {
    const items = [row("1", { n: 1 }), row("2", { n: 2 })]
    const result = applySorts(items, undefined, {})
    expect(result).not.toBe(items)
    expect(result.map((r) => r._id)).toEqual(["1", "2"])
  })

  test("empty-array sorts returns a fresh copy of items", () => {
    const items = [row("1", { n: 1 }), row("2", { n: 2 })]
    const result = applySorts(items, [], {})
    expect(result).not.toBe(items)
    expect(result.map((r) => r._id)).toEqual(["1", "2"])
  })
})

describe("applySorts — single-key ordering", () => {
  const accessors = {
    n: (r: TestRow) => (typeof r.n === "number" ? r.n : null),
  }

  test("single-key asc", () => {
    const items = [row("1", { n: 3 }), row("2", { n: 1 }), row("3", { n: 2 })]
    const sorts: ViewSort[] = [{ field: "n", direction: "asc" }]
    const result = applySorts(items, sorts, accessors)
    expect(result.map((r) => r._id)).toEqual(["2", "3", "1"])
  })

  test("single-key desc", () => {
    const items = [row("1", { n: 3 }), row("2", { n: 1 }), row("3", { n: 2 })]
    const sorts: ViewSort[] = [{ field: "n", direction: "desc" }]
    const result = applySorts(items, sorts, accessors)
    expect(result.map((r) => r._id)).toEqual(["1", "3", "2"])
  })
})

describe("applySorts — direction-aware null ordering", () => {
  const accessors = {
    n: (r: TestRow) => (typeof r.n === "number" ? r.n : null),
  }

  test("null on the right sorts first (asc)", () => {
    const items = [row("1", { n: 1 }), row("2", { n: null })]
    const sorts: ViewSort[] = [{ field: "n", direction: "asc" }]
    const result = applySorts(items, sorts, accessors)
    expect(result.map((r) => r._id)).toEqual(["2", "1"])
  })

  test("null on the left sorts first (asc)", () => {
    const items = [row("1", { n: null }), row("2", { n: 1 })]
    const sorts: ViewSort[] = [{ field: "n", direction: "asc" }]
    const result = applySorts(items, sorts, accessors)
    expect(result.map((r) => r._id)).toEqual(["1", "2"])
  })

  test("null sorts last with desc direction", () => {
    const items = [row("1", { n: 1 }), row("2", { n: null }), row("3", { n: 5 })]
    const sorts: ViewSort[] = [{ field: "n", direction: "desc" }]
    const result = applySorts(items, sorts, accessors)
    expect(result.map((r) => r._id)).toEqual(["3", "1", "2"])
  })

  test("asc and desc are exact inverses (nulls flip ends, non-null block reverses)", () => {
    const items = [
      row("a", { n: 1 }),
      row("b", { n: null }),
      row("c", { n: 5 }),
      row("d", { n: null }),
      row("e", { n: 3 }),
    ]
    const asc = applySorts(items, [{ field: "n", direction: "asc" }], accessors)
    const desc = applySorts(items, [{ field: "n", direction: "desc" }], accessors)
    expect(asc.map((r) => r._id)).toEqual(["b", "d", "a", "e", "c"])
    expect(desc.map((r) => r._id)).toEqual(["c", "e", "a", "b", "d"])
    const nonNull = (ids: readonly string[]) =>
      ids.filter((id) => id === "a" || id === "c" || id === "e")
    const ascNonNull = nonNull(asc.map((r) => r._id))
    const descNonNull = nonNull(desc.map((r) => r._id))
    expect(descNonNull).toEqual([...ascNonNull].reverse())
  })

  test("both-null falls through to next sort key (asc primary)", () => {
    const items = [
      row("1", { a: null, b: 2 }),
      row("2", { a: null, b: 1 }),
      row("3", { a: 5, b: 3 }),
    ]
    const sorts: ViewSort[] = [
      { field: "a", direction: "asc" },
      { field: "b", direction: "asc" },
    ]
    const a = (r: TestRow) => (typeof r.a === "number" ? r.a : null)
    const b = (r: TestRow) => (typeof r.b === "number" ? r.b : null)
    const result = applySorts(items, sorts, { a, b })
    expect(result.map((r) => r._id)).toEqual(["2", "1", "3"])
  })

  test("both-null still falls through under desc primary direction", () => {
    const items = [
      row("1", { a: null, b: 2 }),
      row("2", { a: null, b: 1 }),
      row("3", { a: 5, b: 3 }),
    ]
    const sorts: ViewSort[] = [
      { field: "a", direction: "desc" },
      { field: "b", direction: "asc" },
    ]
    const a = (r: TestRow) => (typeof r.a === "number" ? r.a : null)
    const b = (r: TestRow) => (typeof r.b === "number" ? r.b : null)
    const result = applySorts(items, sorts, { a, b })
    expect(result.map((r) => r._id)).toEqual(["3", "2", "1"])
  })
})

describe("applySorts — multi-key tie-break", () => {
  const a = (r: TestRow) => (typeof r.a === "number" ? r.a : null)
  const b = (r: TestRow) => (typeof r.b === "number" ? r.b : null)

  test("falls through to second key when first ties", () => {
    const items = [row("1", { a: 1, b: 3 }), row("2", { a: 1, b: 1 }), row("3", { a: 1, b: 2 })]
    const sorts: ViewSort[] = [
      { field: "a", direction: "asc" },
      { field: "b", direction: "asc" },
    ]
    const result = applySorts(items, sorts, { a, b })
    expect(result.map((r) => r._id)).toEqual(["2", "3", "1"])
  })

  test("mixed directions across keys", () => {
    const items = [row("1", { a: 1, b: 1 }), row("2", { a: 1, b: 5 }), row("3", { a: 2, b: 1 })]
    const sorts: ViewSort[] = [
      { field: "a", direction: "asc" },
      { field: "b", direction: "desc" },
    ]
    const result = applySorts(items, sorts, { a, b })
    expect(result.map((r) => r._id)).toEqual(["2", "1", "3"])
  })
})

describe("applySorts — stable sort on full tie", () => {
  test("rows that tie on every key preserve input order", () => {
    const items = [
      row("1", { a: 1, b: 1 }),
      row("2", { a: 1, b: 1 }),
      row("3", { a: 1, b: 1 }),
      row("4", { a: 1, b: 1 }),
    ]
    const a = (r: TestRow) => (typeof r.a === "number" ? r.a : null)
    const b = (r: TestRow) => (typeof r.b === "number" ? r.b : null)
    const sorts: ViewSort[] = [
      { field: "a", direction: "asc" },
      { field: "b", direction: "asc" },
    ]
    const result = applySorts(items, sorts, { a, b })
    expect(result.map((r) => r._id)).toEqual(["1", "2", "3", "4"])
  })

  test("rows that tie on first key retain relative order across second-key groups", () => {
    const items = [row("1", { a: 1, b: 2 }), row("2", { a: 1, b: 1 }), row("3", { a: 1, b: 2 })]
    const a = (r: TestRow) => (typeof r.a === "number" ? r.a : null)
    const b = (r: TestRow) => (typeof r.b === "number" ? r.b : null)
    const sorts: ViewSort[] = [
      { field: "a", direction: "asc" },
      { field: "b", direction: "asc" },
    ]
    const result = applySorts(items, sorts, { a, b })
    expect(result.map((r) => r._id)).toEqual(["2", "1", "3"])
  })
})

describe("applySorts — unknown field", () => {
  test("accessor absent → the sort key is skipped", () => {
    const items = [row("1", { n: 2 }), row("2", { n: 1 })]
    const sorts: ViewSort[] = [
      { field: "unknown", direction: "asc" },
      { field: "n", direction: "asc" },
    ]
    const accessors = {
      n: (r: TestRow) => (typeof r.n === "number" ? r.n : null),
    }
    const result = applySorts(items, sorts, accessors)
    expect(result.map((r) => r._id)).toEqual(["2", "1"])
  })

  test("all sorts unknown → input order preserved", () => {
    const items = [row("1", { n: 2 }), row("2", { n: 1 })]
    const sorts: ViewSort[] = [{ field: "unknown", direction: "asc" }]
    const result = applySorts(items, sorts, {})
    expect(result.map((r) => r._id)).toEqual(["1", "2"])
  })
})

describe("applySorts — legacy direction normalization", () => {
  function asViewSort(field: string, direction: string): ViewSort {
    return { field, direction } as ViewSort
  }

  test("direction='manual' is normalized to asc", () => {
    const items = [row("1", { n: 3 }), row("2", { n: 1 }), row("3", { n: 2 })]
    const sorts: ViewSort[] = [asViewSort("n", "manual")]
    const accessors = {
      n: (r: TestRow) => (typeof r.n === "number" ? r.n : null),
    }
    const result = applySorts(items, sorts, accessors)
    expect(result.map((r) => r._id)).toEqual(["2", "3", "1"])
  })

  test("arbitrary non-asc/non-desc direction falls back to asc", () => {
    const items = [row("1", { n: 3 }), row("2", { n: 1 })]
    const sorts: ViewSort[] = [asViewSort("n", "garbage")]
    const accessors = {
      n: (r: TestRow) => (typeof r.n === "number" ? r.n : null),
    }
    const result = applySorts(items, sorts, accessors)
    expect(result.map((r) => r._id)).toEqual(["2", "1"])
  })
})
