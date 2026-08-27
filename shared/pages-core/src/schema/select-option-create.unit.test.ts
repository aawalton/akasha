import { describe, expect, test } from "bun:test"
import { resolveMultiSelectWriteOptions, resolveSelectOptionCreate } from "./select-option-create"

const existingOptions = [
  { id: "Fantasy", label: "Fantasy" },
  { id: "abc-123", label: "Sci-Fi & Fantasy" },
]

describe("resolveSelectOptionCreate — privileged option-create guardrails", () => {
  test("trims surrounding whitespace before creating", () => {
    const r = resolveSelectOptionCreate({
      label: "  Horror  ",
      existingOptions,
      maxLabelLength: 100,
    })
    expect(r.kind).toBe("create")
    if (r.kind === "create") expect(r.option.label).toBe("Horror")
  })

  test("rejects empty-after-trim", () => {
    const r = resolveSelectOptionCreate({ label: "   ", existingOptions, maxLabelLength: 100 })
    expect(r.kind).toBe("invalid")
  })

  test("rejects a label exceeding the length cap (measured after trim)", () => {
    const r = resolveSelectOptionCreate({
      label: `${"x".repeat(101)}`,
      existingOptions,
      maxLabelLength: 100,
    })
    expect(r.kind).toBe("invalid")
  })

  test("accepts a label exactly at the cap", () => {
    const r = resolveSelectOptionCreate({
      label: "x".repeat(100),
      existingOptions,
      maxLabelLength: 100,
    })
    expect(r.kind).toBe("create")
  })

  test("case-insensitive dedupe returns the existing option, mints no new id", () => {
    const r = resolveSelectOptionCreate({ label: "fAnTaSy", existingOptions, maxLabelLength: 100 })
    expect(r.kind).toBe("existing")
    if (r.kind === "existing") expect(r.option.id).toBe("Fantasy")
  })

  test("case-insensitive dedupe matches against the trimmed label", () => {
    const r = resolveSelectOptionCreate({
      label: "  sci-fi & fantasy ",
      existingOptions,
      maxLabelLength: 100,
    })
    expect(r.kind).toBe("existing")
    if (r.kind === "existing") expect(r.option.id).toBe("abc-123")
  })

  test("a fresh distinct label creates a new option with a non-empty id", () => {
    const r = resolveSelectOptionCreate({ label: "Mystery", existingOptions, maxLabelLength: 100 })
    expect(r.kind).toBe("create")
    if (r.kind === "create") {
      expect(r.option.label).toBe("Mystery")
      expect(r.option.id.length).toBeGreaterThan(0)
    }
  })

  test("dedupe is exact (case-insensitive) — a substring does not collide", () => {
    const r = resolveSelectOptionCreate({ label: "Fan", existingOptions, maxLabelLength: 100 })
    expect(r.kind).toBe("create")
  })

  test("mintId strategy controls the fresh option id (identity mint → id equals label)", () => {
    const r = resolveSelectOptionCreate({
      label: "author:astra",
      existingOptions,
      maxLabelLength: 100,
      mintId: (label) => label,
    })
    expect(r.kind).toBe("create")
    if (r.kind === "create") expect(r.option).toEqual({ id: "author:astra", label: "author:astra" })
  })
})

describe("resolveMultiSelectWriteOptions — agent write-boundary declare plan", () => {
  test("known values pass through with nothing to declare", () => {
    const r = resolveMultiSelectWriteOptions({
      values: ["Fantasy"],
      existingOptions,
    })
    expect(r).toEqual({ kind: "resolved", optionsToAdd: [], normalizedValues: ["Fantasy"] })
  })

  test("unknown values become identity-minted options, write order preserved", () => {
    const r = resolveMultiSelectWriteOptions({
      values: ["test", "author:astra"],
      existingOptions,
    })
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") {
      expect(r.optionsToAdd).toEqual([
        { id: "test", label: "test" },
        { id: "author:astra", label: "author:astra" },
      ])
      expect(r.normalizedValues).toEqual(["test", "author:astra"])
    }
  })

  test("case-insensitive collision normalizes the value to the existing option id", () => {
    const r = resolveMultiSelectWriteOptions({
      values: ["sci-fi & fantasy"],
      existingOptions,
    })
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") {
      expect(r.optionsToAdd).toEqual([])
      expect(r.normalizedValues).toEqual(["abc-123"])
    }
  })

  test("duplicate incoming values collapse onto one declared option", () => {
    const r = resolveMultiSelectWriteOptions({
      values: ["cli", "CLI", "cli"],
      existingOptions: [],
    })
    expect(r.kind).toBe("resolved")
    if (r.kind === "resolved") {
      expect(r.optionsToAdd).toEqual([{ id: "cli", label: "cli" }])
      expect(r.normalizedValues).toEqual(["cli", "cli", "cli"])
    }
  })

  test("a non-string value is invalid — only labels can be declared", () => {
    const r = resolveMultiSelectWriteOptions({ values: ["ok", 7], existingOptions: [] })
    expect(r.kind).toBe("invalid")
  })

  test("an empty-after-trim value is invalid", () => {
    const r = resolveMultiSelectWriteOptions({ values: ["   "], existingOptions: [] })
    expect(r.kind).toBe("invalid")
  })
})
