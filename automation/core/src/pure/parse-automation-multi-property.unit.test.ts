import { describe, expect, test } from "bun:test"
import { parsePageAsAutomation } from "./parse-automation"

const validRow = () => ({
  id: "01970000-0000-7000-8000-000000000001",
  name: "Task completion archives",
  enabled: true,
  pageType: "to-do",
  trigger: {
    kind: "property_changed_to",
    propertyId: "completedAt",
    from: { kind: "is_empty" },
    to: { kind: "is_not_empty" },
  },
  actions: [
    {
      kind: "create_page",
      pageTypeSlug: "completed-task",
      properties: {
        title: "=source.title",
        taskId: "=source.id",
        completedAt: "=source.completedAt",
      },
    },
    {
      kind: "patch_source",
      set: { completedAt: null },
    },
  ],
})

describe("parsePageAsAutomation — multi-property propertyId", () => {
  test("multi-property propertyId: array parses and normalizes to propertyIds", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "property_changed_to",
        propertyId: ["a", "b", "c"],
        to: { kind: "is_not_empty" },
      },
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    expect(parsed?.trigger.kind).toBe("property_changed_to")
    if (parsed?.trigger.kind === "property_changed_to") {
      expect(parsed.trigger.propertyIds).toEqual(["a", "b", "c"])
    }
  })

  test("single-property propertyId: string normalizes to one-element propertyIds array", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "property_changed_to",
        propertyId: "completedAt",
        to: { kind: "is_not_empty" },
      },
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    if (parsed?.trigger.kind === "property_changed_to") {
      expect(parsed.trigger.propertyIds).toEqual(["completedAt"])
    }
  })

  test("rejects empty propertyId array", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "property_changed_to",
        propertyId: [],
        to: { kind: "is_not_empty" },
      },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects propertyId array with non-string elements (numbers)", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "property_changed_to",
        propertyId: [1, 2],
        to: { kind: "is_not_empty" },
      },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects propertyId array with mixed types (string + number)", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "property_changed_to",
        propertyId: ["x", 5],
        to: { kind: "is_not_empty" },
      },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects propertyId array containing an empty string", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "property_changed_to",
        propertyId: ["a", ""],
        to: { kind: "is_not_empty" },
      },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("multi-property form preserves optional `from` matcher", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "property_changed_to",
        propertyId: ["a", "b"],
        from: { kind: "is_empty" },
        to: { kind: "is_not_empty" },
      },
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    if (parsed?.trigger.kind === "property_changed_to") {
      expect(parsed.trigger.propertyIds).toEqual(["a", "b"])
      expect(parsed.trigger.from).toEqual({ kind: "is_empty" })
      expect(parsed.trigger.to).toEqual({ kind: "is_not_empty" })
    }
  })
})
