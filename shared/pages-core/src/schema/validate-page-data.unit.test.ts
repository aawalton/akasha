import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import { validatePageData } from "./validate-page-data"

describe("validatePageData — happy path", () => {
  test("valid properties return no errors", () => {
    const result = validatePageData({ t: "hello", n: 42, c: true }, [
      { id: "t", title: "Text", type: "text" },
      { id: "n", title: "Num", type: "number" },
      { id: "c", title: "Check", type: "boolean" },
    ])
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })
})

describe("validatePageData — number validator", () => {
  const defs = [{ id: "n", title: "Num", type: "number", config: { min: 0, max: 100 } }]

  test("NaN value returns error", () => {
    const result = validatePageData({ n: "not-a-number" }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Must be a number")
  })

  test("below min returns error", () => {
    const result = validatePageData({ n: -5 }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Must be at least 0")
  })

  test("above max returns error", () => {
    const result = validatePageData({ n: 200 }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Must be at most 100")
  })

  test("null value passes (nullish)", () => {
    const result = validatePageData({ n: null }, defs)
    expect(result.valid).toBe(true)
  })

  test("empty string passes (nullish)", () => {
    const result = validatePageData({ n: "" }, defs)
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — select validator", () => {
  const defs = [
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
  ]

  test("valid option passes", () => {
    const result = validatePageData({ s: "a" }, defs)
    expect(result.valid).toBe(true)
  })

  test("invalid option returns error", () => {
    const result = validatePageData({ s: "z" }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Invalid option")
  })

  test("non-string returns error", () => {
    const result = validatePageData({ s: 123 }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Select value must be a string")
  })

  test("null passes (nullish)", () => {
    const result = validatePageData({ s: null }, defs)
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — multi-select validator", () => {
  const defs = [
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
  ]

  test("valid array passes", () => {
    const result = validatePageData({ ms: ["x", "y"] }, defs)
    expect(result.valid).toBe(true)
  })

  test("non-array returns error", () => {
    const result = validatePageData({ ms: "x" }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Multi-select value must be an array")
  })

  test("invalid option in array returns error", () => {
    const result = validatePageData({ ms: ["x", "z"] }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Invalid option: z")
  })

  test("non-string in array returns error", () => {
    const result = validatePageData({ ms: [123] }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Multi-select values must be strings")
  })

  test("null passes", () => {
    const result = validatePageData({ ms: null }, defs)
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — path-select validator", () => {
  const defs = [{ id: "ps", title: "Path", type: "path-select", config: { providerId: "p" } }]
  const boundedDefs = [
    {
      id: "ps",
      title: "Path",
      type: "path-select",
      config: { providerId: "p", requiredDepth: 2, maxDepth: 3 },
    },
  ]

  test("mixed string/number array passes; null passes", () => {
    expect(validatePageData({ ps: ["combat", 5, "annulment"] }, defs).valid).toBe(true)
    expect(validatePageData({ ps: null }, defs).valid).toBe(true)
  })

  test("non-array returns shape error", () => {
    const result = validatePageData({ ps: "combat" }, defs)
    expect(requireFirst(result.errors).message).toBe("path-select value must be an array")
  })

  test("non-string non-number segment returns segment error", () => {
    const result = validatePageData({ ps: ["combat", true] }, defs)
    expect(requireFirst(result.errors).message).toBe(
      "path-select segments must be strings or numbers"
    )
  })

  test("requiredDepth and maxDepth bounds are enforced", () => {
    expect(requireFirst(validatePageData({ ps: ["a"] }, boundedDefs).errors).message).toBe(
      "Path must have at least 2 segments"
    )
    expect(
      requireFirst(validatePageData({ ps: ["a", "b", "c", "d"] }, boundedDefs).errors).message
    ).toBe("Path must have at most 3 segments")
  })
})

describe("validatePageData — calendar-date validator", () => {
  const defs = [{ id: "d", title: "Date", type: "calendar-date" }]

  test("valid YYYY-MM-DD passes", () => {
    const result = validatePageData({ d: "2026-01-15" }, defs)
    expect(result.valid).toBe(true)
  })

  test("non-YYYY-MM-DD returns error", () => {
    const result = validatePageData({ d: "Jan 15 2026" }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Date must be in YYYY-MM-DD format")
  })

  test("non-string returns error", () => {
    const result = validatePageData({ d: 12345 }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Date must be a string")
  })

  test("null passes (nullish)", () => {
    const result = validatePageData({ d: null }, defs)
    expect(result.valid).toBe(true)
  })

  test("empty string passes (nullish)", () => {
    const result = validatePageData({ d: "" }, defs)
    expect(result.valid).toBe(true)
  })
})

describe("validatePageData — calendar-time validator", () => {
  const defs = [{ id: "t", title: "Time", type: "calendar-time" }]

  test("valid HH:MM passes", () => {
    expect(validatePageData({ t: "00:00" }, defs).valid).toBe(true)
    expect(validatePageData({ t: "14:30" }, defs).valid).toBe(true)
    expect(validatePageData({ t: "23:59" }, defs).valid).toBe(true)
  })

  test("out-of-range or unpadded returns error", () => {
    const result = validatePageData({ t: "9:05" }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Time must be in HH:MM format")
    expect(validatePageData({ t: "24:00" }, defs).valid).toBe(false)
    expect(validatePageData({ t: "14:60" }, defs).valid).toBe(false)
  })

  test("non-string returns error", () => {
    const result = validatePageData({ t: 1430 }, defs)
    expect(result.valid).toBe(false)
    expect(requireFirst(result.errors).message).toBe("Time must be a string")
  })

  test("null and empty pass (nullish)", () => {
    expect(validatePageData({ t: null }, defs).valid).toBe(true)
    expect(validatePageData({ t: "" }, defs).valid).toBe(true)
  })
})
