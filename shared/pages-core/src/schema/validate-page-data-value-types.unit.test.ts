import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import type { PropertyDefinition } from "../types"
import { evaluateSelectWrite, validatePageData } from "./validate-page-data"

describe("validatePageData — instant validator", () => {
  const defs = [{ id: "i", title: "Instant", type: "instant" }]

  test("number passes", () => {
    const result = validatePageData({ i: 1700000000000 }, defs)
    expect(result.valid).toBe(true)
  })

  test("canonical ISO string passes", () => {
    const result = validatePageData({ i: "2026-01-15T12:30:45.000Z" }, defs)
    expect(result.valid).toBe(true)
  })

  test("parseable ISO date string passes", () => {
    const result = validatePageData({ i: "2026-01-15" }, defs)
    expect(result.valid).toBe(true)
  })

  test("unparseable string returns error", () => {
    const result = validatePageData({ i: "not-a-date" }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe(
      "Instant must be a number or ISO 8601 datetime string"
    )
  })

  test("non-finite number returns error", () => {
    const result = validatePageData({ i: Number.POSITIVE_INFINITY }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe(
      "Instant must be a number or ISO 8601 datetime string"
    )
  })

  test("null passes (nullish)", () => {
    const result = validatePageData({ i: null }, defs)
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — url validator", () => {
  const defs = [{ id: "u", title: "URL", type: "url" }]

  test("valid URL passes", () => {
    const result = validatePageData({ u: "https://example.com" }, defs)
    expect(result.valid).toBe(true)
  })

  test("invalid URL returns error", () => {
    const result = validatePageData({ u: "not-a-url" }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Invalid URL")
  })

  test("non-string returns error", () => {
    const result = validatePageData({ u: 123 }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("URL must be a string")
  })

  test("null passes (nullish)", () => {
    const result = validatePageData({ u: null }, defs)
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — relation validator", () => {
  const defs = [{ id: "r", title: "Rel", type: "relation" }]

  test("string passes", () => {
    const result = validatePageData({ r: "page-1" }, defs)
    expect(result.valid).toBe(true)
  })

  test("non-string returns error", () => {
    const result = validatePageData({ r: 123 }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Relation value must be a string")
  })

  test("null passes (nullish)", () => {
    const result = validatePageData({ r: null }, defs)
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — multi-relation validator", () => {
  const defs = [{ id: "mr", title: "MRel", type: "multi-relation" }]

  test("valid array passes", () => {
    const result = validatePageData({ mr: ["p1", "p2"] }, defs)
    expect(result.valid).toBe(true)
  })

  test("non-array returns error", () => {
    const result = validatePageData({ mr: "p1" }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Multi-relation value must be an array")
  })

  test("non-string in array returns error", () => {
    const result = validatePageData({ mr: [123] }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Multi-relation values must be strings")
  })

  test("null passes", () => {
    const result = validatePageData({ mr: null }, defs)
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — computed types (rollup, aggregate, formula)", () => {
  test("rollup always passes", () => {
    const result = validatePageData({ r: "anything" }, [{ id: "r", title: "R", type: "rollup" }])
    expect(result.valid).toBe(true)
  })

  test("aggregate always passes", () => {
    const result = validatePageData({ a: 999 }, [{ id: "a", title: "A", type: "aggregate" }])
    expect(result.valid).toBe(true)
  })

  test("formula always passes", () => {
    const result = validatePageData({ f: "computed" }, [
      { id: "f", title: "F", type: "formula", config: { expression: "1+1", returnType: "number" } },
    ])
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — passthrough types (text, markdown, json, boolean)", () => {
  test("text always passes", () => {
    const result = validatePageData({ t: 12345 }, [{ id: "t", title: "T", type: "text" }])
    expect(result.valid).toBe(true)
  })

  test("markdown always passes", () => {
    const result = validatePageData({ m: null }, [{ id: "m", title: "M", type: "markdown" }])
    expect(result.valid).toBe(true)
  })

  test("json always passes", () => {
    const result = validatePageData({ j: { nested: true } }, [
      { id: "j", title: "J", type: "json" },
    ])
    expect(result.valid).toBe(true)
  })

  test("boolean always passes", () => {
    const result = validatePageData({ c: "not-a-boolean" }, [
      { id: "c", title: "C", type: "boolean" },
    ])
    expect(result.valid).toBe(true)
  })
})

describe("evaluateSelectWrite — agent write boundary", () => {
  const defs: readonly PropertyDefinition[] = [
    {
      id: "s",
      title: "Sel",
      type: "select",
      config: {
        options: [
          { id: "a", label: "A" },
          { id: "b", label: "B" },
        ],
      },
    },
    {
      id: "ms",
      title: "MS",
      type: "multi-select",
      config: {
        options: [
          { id: "x", label: "X" },
          { id: "y", label: "Y" },
        ],
      },
    },
    { id: "n", title: "Num", type: "number", config: { min: 0, max: 100 } },
    { id: "u", title: "URL", type: "url" },
  ]

  test("valid select + multi-select values yield no violations", () => {
    expect(evaluateSelectWrite({ s: "a", ms: ["x", "y"] }, defs)).toEqual([])
  })

  test("out-of-options select value is a violation carrying value + valid option ids", () => {
    const violations = evaluateSelectWrite({ s: "z" }, defs)
    expect(violations).toHaveLength(1)
    const v = requireFirst(violations)
    expect(v.propertyId).toBe("s")
    expect(v.propertyType).toBe("select")
    expect(v.value).toBe("z")
    expect(v.message).toBe("Invalid option")
    expect(v.validOptionIds).toEqual(["a", "b"])
  })

  test("out-of-options multi-select id is a violation with the config's option ids", () => {
    const violations = evaluateSelectWrite({ ms: ["x", "bogus"] }, defs)
    expect(violations).toHaveLength(1)
    const v = requireFirst(violations)
    expect(v.propertyId).toBe("ms")
    expect(v.propertyType).toBe("multi-select")
    expect(v.message).toBe("Invalid option: bogus")
    expect(v.validOptionIds).toEqual(["x", "y"])
  })

  test("non-select property types (number, url) are never evaluated here", () => {
    expect(evaluateSelectWrite({ n: 9999, u: "not-a-url" }, defs)).toEqual([])
  })

  test("nullish select value passes (clearing a value is allowed)", () => {
    expect(evaluateSelectWrite({ s: null }, defs)).toEqual([])
    expect(evaluateSelectWrite({ s: "" }, defs)).toEqual([])
  })

  test("property absent from the write bag is not evaluated", () => {
    expect(evaluateSelectWrite({ n: 5 }, defs)).toEqual([])
  })

  test("empty options list rejects any non-null select value", () => {
    const emptyDefs: readonly PropertyDefinition[] = [
      { id: "s", title: "Sel", type: "select", config: { options: [] } },
    ]
    const violations = evaluateSelectWrite({ s: "anything" }, emptyDefs)
    expect(violations).toHaveLength(1)
    expect(requireFirst(violations).validOptionIds).toEqual([])
  })
})

describe("validatePageData — edge cases", () => {
  test("unknown property type is gracefully skipped", () => {
    const result = validatePageData({ x: "value" }, [{ id: "x", title: "X", type: "future-type" }])
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  test("unparseable definition is gracefully skipped", () => {
    const result = validatePageData({ x: "value" }, [
      { id: "", title: "", type: "not-a-real-type" },
    ])
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  test("missing property value treated as undefined", () => {
    const result = validatePageData({}, [
      { id: "n", title: "N", type: "number", config: { min: 0 } },
    ])
    expect(result.valid).toBe(true)
  })
})
