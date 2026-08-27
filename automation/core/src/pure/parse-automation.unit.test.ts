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

describe("parsePageAsAutomation", () => {
  test("parses a well-formed automation row", () => {
    const parsed = parsePageAsAutomation(validRow())
    expect(parsed).not.toBeNull()
    expect(parsed?.id).toBe("01970000-0000-7000-8000-000000000001")
    expect(parsed?.enabled).toBe(true)
    expect(parsed?.actions.length).toBe(2)
    expect(parsed?.actions[0]?.kind).toBe("create_page")
  })

  test("returns null for missing id", () => {
    const row = { ...validRow(), id: undefined }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("returns null when enabled is not strictly true", () => {
    expect(parsePageAsAutomation({ ...validRow(), enabled: false })).toBeNull()
    expect(parsePageAsAutomation({ ...validRow(), enabled: null })).toBeNull()
    expect(parsePageAsAutomation({ ...validRow(), enabled: undefined })).toBeNull()
    expect(parsePageAsAutomation({ ...validRow(), enabled: 1 })).toBeNull()
  })

  test("returns null without triggerPageTypeSlug", () => {
    const row = { ...validRow(), pageType: undefined }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("returns null with malformed trigger.kind", () => {
    const row = {
      ...validRow(),
      trigger: { kind: "bogus", propertyId: "x", to: { kind: "truthy" } },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("returns null with malformed matcher", () => {
    const row = {
      ...validRow(),
      trigger: {
        kind: "property_changed_to",
        propertyId: "x",
        to: { kind: "equals" },
      },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("returns null when actions is not an array", () => {
    expect(
      parsePageAsAutomation({ ...validRow(), actions: { kind: "patch_source", set: {} } })
    ).toBeNull()
  })

  test("returns null with malformed action kind", () => {
    const row = {
      ...validRow(),
      actions: [{ kind: "rpc" }],
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("accepts delete_source with and without a condition", () => {
    const bare = {
      ...validRow(),
      actions: [{ kind: "delete_source" }],
    }
    const bareParsed = parsePageAsAutomation(bare)
    expect(bareParsed).not.toBeNull()
    expect(bareParsed?.actions[0]?.kind).toBe("delete_source")

    const guarded = {
      ...validRow(),
      actions: [{ kind: "delete_source", condition: "=source.rrule.rule == null" }],
    }
    expect(parsePageAsAutomation(guarded)).not.toBeNull()
  })

  test("accepts a well-formed notify action and normalizes its fields", () => {
    const row = {
      ...validRow(),
      actions: [
        {
          kind: "notify",
          userId: "=source.userId",
          title: "Task completed",
          body: "=source.title",
          link: "/tasks",
          notifyKind: "task-completion",
          notifySource: "automations",
          condition: "=source.completedAt != null",
        },
      ],
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    const action = parsed?.actions[0]
    expect(action?.kind).toBe("notify")
    if (action?.kind === "notify") {
      expect(action.userId).toBe("=source.userId")
      expect(action.title).toBe("Task completed")
      expect(action.body).toBe("=source.title")
      expect(action.link).toBe("/tasks")
      expect(action.notifyKind).toBe("task-completion")
      expect(action.notifySource).toBe("automations")
      expect(action.condition).toBe("=source.completedAt != null")
    }
  })

  test("accepts a minimal notify action (only userId + title)", () => {
    const row = {
      ...validRow(),
      actions: [{ kind: "notify", userId: "=source.userId", title: "Done" }],
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    const action = parsed?.actions[0]
    expect(action?.kind).toBe("notify")
    if (action?.kind === "notify") {
      expect(action.body).toBeUndefined()
      expect(action.link).toBeUndefined()
    }
  })

  test("rejects a notify action missing the required title", () => {
    const row = {
      ...validRow(),
      actions: [{ kind: "notify", userId: "=source.userId" }],
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("falls back to '(unnamed)' when name missing", () => {
    const row = { ...validRow(), name: undefined }
    const parsed = parsePageAsAutomation(row)
    expect(parsed?.name).toBe("(unnamed)")
  })

  test("accepts patch_source with empty set", () => {
    const row = {
      ...validRow(),
      actions: [{ kind: "patch_source", set: {} }],
    }
    expect(parsePageAsAutomation(row)).not.toBeNull()
  })

  test("accepts create_page with optional condition", () => {
    const row = {
      ...validRow(),
      actions: [
        {
          kind: "create_page",
          pageTypeSlug: "x",
          properties: { title: "=source.title" },
          condition: "=source.completedAt != null",
        },
      ],
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    const action = parsed?.actions[0]
    expect(action?.kind).toBe("create_page")
    if (action?.kind === "create_page") {
      expect(action.condition).toBe("=source.completedAt != null")
    }
  })

  test("accepts patch_referrers with single cardinality and no where", () => {
    const row = {
      ...validRow(),
      actions: [
        {
          kind: "patch_referrers",
          referrerPageTypeSlug: "completed-task",
          viaRelationPropertyId: "taskPageId",
          viaRelationCardinality: "single",
          set: { resolved: true },
        },
      ],
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    const action = parsed?.actions[0]
    expect(action?.kind).toBe("patch_referrers")
    if (action?.kind === "patch_referrers") {
      expect(action.viaRelationCardinality).toBe("single")
      expect(action.where).toBeUndefined()
    }
  })

  test("accepts patch_referrers with multi cardinality, where, and condition", () => {
    const row = {
      ...validRow(),
      actions: [
        {
          kind: "patch_referrers",
          referrerPageTypeSlug: "test-page",
          viaRelationPropertyId: "multiRelation",
          viaRelationCardinality: "multi",
          where: [
            { key: "checkbox", eq: false },
            { key: "completedAt", isEmpty: true },
          ],
          set: { number: "=referrer.number + 1" },
          condition: "=referrer.checkbox == false",
        },
      ],
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    const action = parsed?.actions[0]
    expect(action?.kind).toBe("patch_referrers")
    if (action?.kind === "patch_referrers") {
      expect(action.viaRelationCardinality).toBe("multi")
      expect(action.where?.length).toBe(2)
      expect(action.condition).toBe("=referrer.checkbox == false")
    }
  })

  test("rejects patch_referrers with unknown viaRelationCardinality", () => {
    const row = {
      ...validRow(),
      actions: [
        {
          kind: "patch_referrers",
          referrerPageTypeSlug: "x",
          viaRelationPropertyId: "y",
          viaRelationCardinality: "many",
          set: {},
        },
      ],
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects patch_referrers with malformed where condition (missing key)", () => {
    const row = {
      ...validRow(),
      actions: [
        {
          kind: "patch_referrers",
          referrerPageTypeSlug: "x",
          viaRelationPropertyId: "y",
          viaRelationCardinality: "single",
          where: [{ eq: "abc" }],
          set: {},
        },
      ],
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })
})
