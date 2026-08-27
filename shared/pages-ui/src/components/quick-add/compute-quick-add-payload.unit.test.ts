import { describe, expect, test } from "bun:test"
import type { QuickAddConfig } from "@shared/pages-core/schema/quick-add"
import { computeQuickAddPayload } from "./compute-quick-add-payload"

const titleOnly: QuickAddConfig = {
  titlePropertyId: "title",
}

const projectStyle: QuickAddConfig = {
  titlePropertyId: "title",
  notesPropertyId: "notes",
  inlineTokens: [
    {
      sigil: "@",
      propertyId: "tags",
      autocompleteFrom: { kind: "self-property" },
      defaults: ["inbox"],
    },
  ],
  pickers: [
    {
      propertyId: "status",
      defaultValue: "exploration",
    },
  ],
  fixedDefaults: { sortOrder: 0 },
}

describe("computeQuickAddPayload", () => {
  test("title-only: writes just the title", () => {
    const out = computeQuickAddPayload(titleOnly, {
      cleanTitle: "Hello",
      notes: "",
      parsedBySigil: {},
      dismissedDefaultsBySigil: {},
      pickerValues: {},
    })
    expect(out).toEqual({ title: "Hello" })
  })

  test("project-style: merges defaults + parsed + picker default + fixed", () => {
    const out = computeQuickAddPayload(projectStyle, {
      cleanTitle: "Hello",
      notes: "",
      parsedBySigil: { "@": ["foo"] },
      dismissedDefaultsBySigil: {},
      pickerValues: {},
    })
    expect(out).toEqual({
      sortOrder: 0,
      title: "Hello",
      tags: ["inbox", "foo"],
      status: "exploration",
      notes: "",
    })
  })

  test("dismissed default: drops the default token from the merged tags", () => {
    const out = computeQuickAddPayload(projectStyle, {
      cleanTitle: "Hello",
      notes: "",
      parsedBySigil: { "@": ["foo"] },
      dismissedDefaultsBySigil: { "@": ["inbox"] },
      pickerValues: {},
    })
    expect(out.tags).toEqual(["foo"])
  })

  test("picker override beats default", () => {
    const out = computeQuickAddPayload(projectStyle, {
      cleanTitle: "Hello",
      notes: "",
      parsedBySigil: {},
      dismissedDefaultsBySigil: {},
      pickerValues: { status: "active" },
    })
    expect(out.status).toBe("active")
  })

  test("notes blank still emits empty string when notesPropertyId set", () => {
    const out = computeQuickAddPayload(projectStyle, {
      cleanTitle: "Hello",
      notes: "",
      parsedBySigil: {},
      dismissedDefaultsBySigil: {},
      pickerValues: {},
    })
    expect(out.notes).toBe("")
  })

  test("notes omitted when notesPropertyId unset", () => {
    const out = computeQuickAddPayload(titleOnly, {
      cleanTitle: "x",
      notes: "ignored",
      parsedBySigil: {},
      dismissedDefaultsBySigil: {},
      pickerValues: {},
    })
    expect("notes" in out).toBe(false)
  })

  test("parsed token already in defaults: does not duplicate", () => {
    const out = computeQuickAddPayload(projectStyle, {
      cleanTitle: "Hello",
      notes: "",
      parsedBySigil: { "@": ["inbox"] },
      dismissedDefaultsBySigil: {},
      pickerValues: {},
    })
    expect(out.tags).toEqual(["inbox"])
  })
})
