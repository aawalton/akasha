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

describe("parsePageAsAutomation — created trigger", () => {
  test("parses created trigger with single propertyId", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "created",
        propertyId: "status",
        to: { kind: "equals", value: "open" },
      },
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    expect(parsed?.trigger.kind).toBe("created")
    if (parsed?.trigger.kind === "created") {
      expect(parsed.trigger.propertyIds).toEqual(["status"])
      expect(parsed.trigger.to).toEqual({ kind: "equals", value: "open" })
    }
  })

  test("parses created trigger with array propertyId", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "created",
        propertyId: ["status", "phase"],
        to: { kind: "is_not_empty" },
      },
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    if (parsed?.trigger.kind === "created") {
      expect(parsed.trigger.propertyIds).toEqual(["status", "phase"])
    }
  })

  test("parses created trigger with each matcher kind for `to`", () => {
    const matcherCases = [
      { kind: "is_empty" },
      { kind: "is_not_empty" },
      { kind: "equals", value: "x" },
      { kind: "not_equals", value: 0 },
      { kind: "truthy" },
      { kind: "falsy" },
    ]
    for (const matcher of matcherCases) {
      const row = {
        ...validRow(),
        trigger: { kind: "created", propertyId: "x", to: matcher },
      }
      const parsed = parsePageAsAutomation(row)
      expect(parsed).not.toBeNull()
      if (parsed?.trigger.kind === "created") {
        expect(parsed.trigger.to).toEqual(matcher)
      }
    }
  })

  test("rejects created trigger missing propertyId", () => {
    const row = {
      ...validRow(),
      trigger: { kind: "created", to: { kind: "is_not_empty" } },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects created trigger missing `to` matcher", () => {
    const row = {
      ...validRow(),
      trigger: { kind: "created", propertyId: "x" },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects created trigger with empty propertyId array", () => {
    const row = {
      ...validRow(),
      trigger: { kind: "created", propertyId: [], to: { kind: "is_not_empty" } },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects created trigger with malformed matcher", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "created",
        propertyId: "x",
        to: { kind: "equals" },
      },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })
})
