import { describe, expect, test } from "bun:test"
import type { PropertyDefinition, PropertyType } from "../types"
import { firstAlphabeticalNotesPropertyId, isNotesEligible, resolveNotesPropertyId } from "./notes"

function prop(id: string, title: string, type: PropertyType): PropertyDefinition {
  return { id, title, type }
}

describe("isNotesEligible", () => {
  test("markdown and rich-document are eligible", () => {
    expect(isNotesEligible("markdown")).toBe(true)
    expect(isNotesEligible("rich-document")).toBe(true)
  })
  test("other types are not eligible", () => {
    expect(isNotesEligible("text")).toBe(false)
    expect(isNotesEligible("number")).toBe(false)
    expect(isNotesEligible("json")).toBe(false)
  })
})

describe("firstAlphabeticalNotesPropertyId", () => {
  test("returns the alphabetically-first notes-eligible property's id", () => {
    const props = [
      prop("m2", "Zeta", "markdown"),
      prop("m1", "Alpha", "markdown"),
      prop("m3", "Mid", "markdown"),
    ]
    expect(firstAlphabeticalNotesPropertyId(props)).toBe("m1")
  })

  test("treats markdown and rich-document alike, sorting across both by title", () => {
    const props = [
      prop("r1", "Zeta", "rich-document"),
      prop("m1", "Alpha", "markdown"),
      prop("r2", "Beta", "rich-document"),
    ]
    expect(firstAlphabeticalNotesPropertyId(props)).toBe("m1")
    expect(
      firstAlphabeticalNotesPropertyId([prop("r0", "Aardvark", "rich-document"), ...props])
    ).toBe("r0")
  })

  test("ignores non-eligible properties", () => {
    const props = [
      prop("t1", "Aaa", "text"),
      prop("n1", "Bbb", "number"),
      prop("r1", "Ccc", "rich-document"),
    ]
    expect(firstAlphabeticalNotesPropertyId(props)).toBe("r1")
  })

  test("returns undefined when there are no notes-eligible properties", () => {
    const props = [prop("t1", "Aaa", "text"), prop("n1", "Bbb", "number")]
    expect(firstAlphabeticalNotesPropertyId(props)).toBeUndefined()
  })
})

describe("resolveNotesPropertyId", () => {
  const props = [
    prop("m2", "Zeta", "markdown"),
    prop("m1", "Alpha", "markdown"),
    prop("r1", "Doc", "rich-document"),
    prop("t1", "Aaa", "text"),
  ]

  test("returns the configured id when it is a valid existing markdown property", () => {
    expect(resolveNotesPropertyId("m2", props)).toBe("m2")
  })

  test("returns the configured id when it is a valid existing rich-document property", () => {
    expect(resolveNotesPropertyId("r1", props)).toBe("r1")
  })

  test("falls back to first-alphabetical when the config is undefined", () => {
    expect(resolveNotesPropertyId(undefined, props)).toBe("m1")
  })

  test("falls back when the configured id does not exist", () => {
    expect(resolveNotesPropertyId("nope", props)).toBe("m1")
  })

  test("falls back when the configured id is not a notes-eligible property", () => {
    expect(resolveNotesPropertyId("t1", props)).toBe("m1")
  })

  test("falls back to undefined when config is invalid and no notes-eligible prop exists", () => {
    const noNotes = [prop("t1", "Aaa", "text")]
    expect(resolveNotesPropertyId("t1", noNotes)).toBeUndefined()
  })
})
