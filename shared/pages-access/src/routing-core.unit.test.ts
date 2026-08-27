import { describe, expect, spyOn, test } from "bun:test"
import { applySelect, flattenRow, fromColumn, isPromotedKey } from "./routing-core"

const rawRow = (overrides: Record<string, unknown>): Record<string, unknown> => ({
  id: "00000000-0000-0000-0000-000000000001",
  seq: 1,
  title: null,
  icon: null,
  user_id: "u1",
  page_type_id: "00000000-0000-0000-0000-000000000010",
  page_type_slug: "task",
  attributes: {},
  ...overrides,
})

describe("flattenRow", () => {
  test("rewrites snake_case promoted columns to camelCase", () => {
    const flat = flattenRow(rawRow({ title: "hello", icon: "star" }))

    expect(flat.id).toBe("00000000-0000-0000-0000-000000000001")
    expect(flat.userId).toBe("u1")
    expect(flat.pageTypeId).toBe("00000000-0000-0000-0000-000000000010")
    expect(flat.pageTypeSlug).toBe("task")
    expect(flat.title).toBe("hello")
    expect(flat.icon).toBe("star")
  })

  test("merges attribute keys into the flat namespace", () => {
    const flat = flattenRow(rawRow({ attributes: { x: 1, label: "alpha" } }))

    expect(flat.x).toBe(1)
    expect(flat.label).toBe("alpha")
  })

  test("promoted-wins precedence — promoted column shadows colliding attribute key", () => {
    const flat = flattenRow(
      rawRow({
        title: "from column",
        attributes: { title: "from attributes", x: 1 },
      })
    )

    expect(flat.title).toBe("from column")
    expect(flat.x).toBe(1)
  })

  test("non-object attributes are tolerated and yield no attribute keys", () => {
    const flat = flattenRow(rawRow({ attributes: null }))
    expect(flat.id).toBe("00000000-0000-0000-0000-000000000001")
  })

  test("carries the promoted unique_key column as uniqueKey (#12265)", () => {
    const flat = flattenRow(rawRow({ unique_key: '["x"]' }))
    expect(flat.uniqueKey).toBe('["x"]')
  })

  test("unique_key column NULL projects uniqueKey: null (key present, not absent)", () => {
    const flat = flattenRow(rawRow({ unique_key: null }))
    expect(flat.uniqueKey).toBeNull()
  })

  test("normalizes Date timestamp on the shape-2 (already-flat) input shape", () => {
    const iso = "2026-01-01T00:00:00.000Z"
    const flat = flattenRow({
      id: "00000000-0000-0000-0000-000000000001",
      title: "row",
      updatedAt: new Date(iso),
    })
    expect(flat.updatedAt).toBe(iso)
  })
})

describe("flattenRow — seq boundary coercion (#14934)", () => {
  test("coerces a numeric-string seq (the node-pg bigint wire shape) to a number", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      const flat = flattenRow(rawRow({ seq: "14850" }))
      expect(flat.seq).toBe(14850)
      expect(typeof flat.seq).toBe("number")
      expect(warn).not.toHaveBeenCalled()
    } finally {
      warn.mockRestore()
    }
  })

  test("passes a numeric seq (the pglite / supabase-js shape) through as a number", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      const flat = flattenRow(rawRow({ seq: 14850 }))
      expect(flat.seq).toBe(14850)
      expect(typeof flat.seq).toBe("number")
      expect(warn).not.toHaveBeenCalled()
    } finally {
      warn.mockRestore()
    }
  })

  test("regression: a consumer reading flattened seq gets a number in BOTH driver shapes", () => {
    const fromPg = flattenRow(rawRow({ seq: "42" }))
    const fromPglite = flattenRow(rawRow({ seq: 42 }))
    expect(fromPg.seq).toBe(fromPglite.seq)
    expect(typeof fromPg.seq).toBe("number")
    expect(typeof fromPglite.seq).toBe("number")
  })

  test("coerces seq on the shape-2 (already-flat, no attributes) input shape", () => {
    const flat = flattenRow({
      id: "00000000-0000-0000-0000-000000000001",
      seq: "7",
      title: "row",
    })
    expect(flat.seq).toBe(7)
    expect(typeof flat.seq).toBe("number")
  })

  test("leaves a projected-away seq absent — no fabricated 0", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      const flat = flattenRow({ id: "00000000-0000-0000-0000-000000000001", title: "row" })
      expect("seq" in flat).toBe(false)
      expect(warn).not.toHaveBeenCalled()
    } finally {
      warn.mockRestore()
    }
  })
})

describe("promoted-column routing (uniqueKey — #12265)", () => {
  test("fromColumn maps unique_key → uniqueKey", () => {
    expect(fromColumn("unique_key")).toBe("uniqueKey")
  })

  test("isPromotedKey recognizes uniqueKey", () => {
    expect(isPromotedKey("uniqueKey")).toBe(true)
  })
})

describe("composed keys are not promoted", () => {
  test("isPromotedKey does not recognize status (composed, not promoted)", () => {
    expect(isPromotedKey("status")).toBe(false)
  })
})

describe("applySelect", () => {
  test("undefined select returns the input unchanged", () => {
    const flat = flattenRow(rawRow({ title: "hello", attributes: { x: 1 } }))
    const out = applySelect(flat)
    expect(out).toBe(flat)
  })

  test("missing keys project to null", () => {
    const flat = flattenRow(rawRow({ title: "hello" }))
    const out = applySelect(flat, ["title", "doesNotExist"])
    expect(out.title).toBe("hello")
    expect(out.doesNotExist).toBeNull()
  })
})
