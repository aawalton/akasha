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
  actions: [{ kind: "patch_source", set: { completedAt: null } }],
})

describe("parsePageAsAutomation — schedule trigger", () => {
  const scheduleRow = () => ({
    id: "01970000-0000-7000-8000-0000000000ab",
    name: "Daily tracking page at reset",
    enabled: true,
    trigger: { kind: "schedule", rrule: "FREQ=DAILY", resetDomain: "eso-na" },
    actions: [{ kind: "create_page", pageTypeSlug: "daily-tracking", properties: {} }],
  })

  test("parses a schedule trigger with no triggerPageTypeSlug", () => {
    const parsed = parsePageAsAutomation(scheduleRow())
    expect(parsed).not.toBeNull()
    expect(parsed?.triggerPageTypeSlug).toBeNull()
    expect(parsed?.trigger.kind).toBe("schedule")
    if (parsed?.trigger.kind === "schedule") {
      expect(parsed.trigger.rrule).toBe("FREQ=DAILY")
      expect(parsed.trigger.resetDomain).toBe("eso-na")
    }
    expect(parsed?.actions[0]?.kind).toBe("create_page")
  })

  test("rejects a schedule trigger with an unsupported rrule directive", () => {
    const row = {
      ...scheduleRow(),
      trigger: { kind: "schedule", rrule: "FREQ=DAILY;BYSETPOS=1", resetDomain: "eso-na" },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects a schedule trigger with an unknown resetDomain", () => {
    const row = {
      ...scheduleRow(),
      trigger: { kind: "schedule", rrule: "FREQ=DAILY", resetDomain: "eso-eu" },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("rejects a schedule trigger missing rrule", () => {
    const row = { ...scheduleRow(), trigger: { kind: "schedule", resetDomain: "eso-na" } }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("parses a schedule trigger with the us-mountain resetDomain", () => {
    const row = {
      ...scheduleRow(),
      trigger: { kind: "schedule", rrule: "FREQ=DAILY", resetDomain: "us-mountain" },
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    expect(parsed?.trigger.kind).toBe("schedule")
    if (parsed?.trigger.kind === "schedule") {
      expect(parsed.trigger.resetDomain).toBe("us-mountain")
    }
  })

  test("still requires triggerPageTypeSlug for event-based triggers", () => {
    const row = { ...validRow(), pageType: undefined }
    expect(parsePageAsAutomation(row)).toBeNull()
  })

  test("parses a schedule trigger with activityConditions", () => {
    const row = {
      ...scheduleRow(),
      trigger: {
        kind: "schedule",
        rrule: "FREQ=DAILY",
        resetDomain: "us-mountain",
        activityConditions: ["alan-active", "not-a-registered-condition"],
      },
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    if (parsed?.trigger.kind === "schedule") {
      expect(parsed.trigger.activityConditions).toEqual([
        "alan-active",
        "not-a-registered-condition",
      ])
    }
  })

  test("a schedule trigger without activityConditions parses (optional field)", () => {
    const parsed = parsePageAsAutomation(scheduleRow())
    expect(parsed).not.toBeNull()
    if (parsed?.trigger.kind === "schedule") {
      expect(parsed.trigger.activityConditions).toBeUndefined()
    }
  })

  test("rejects a schedule trigger with an empty-string condition name", () => {
    const row = {
      ...scheduleRow(),
      trigger: {
        kind: "schedule",
        rrule: "FREQ=DAILY",
        resetDomain: "us-mountain",
        activityConditions: [""],
      },
    }
    expect(parsePageAsAutomation(row)).toBeNull()
  })
})
