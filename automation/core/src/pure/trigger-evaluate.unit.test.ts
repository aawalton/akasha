import { describe, expect, test } from "bun:test"
import { evaluateTrigger, matcherMatches } from "./trigger-evaluate"
import { asTrigger, createdEvent, updatedEvent } from "./trigger-evaluate.test-helpers"
import type { EmittedEvent, Trigger } from "./types"

const PROP = "completedAt"

describe("matcherMatches", () => {
  test("is_empty matches null", () => {
    expect(matcherMatches({ kind: "is_empty" }, null)).toBe(true)
  })
  test("is_empty matches undefined", () => {
    expect(matcherMatches({ kind: "is_empty" }, undefined)).toBe(true)
  })
  test("is_empty rejects non-empty", () => {
    expect(matcherMatches({ kind: "is_empty" }, "x")).toBe(false)
    expect(matcherMatches({ kind: "is_empty" }, 0)).toBe(false)
  })
  test("is_not_empty inverts is_empty", () => {
    expect(matcherMatches({ kind: "is_not_empty" }, null)).toBe(false)
    expect(matcherMatches({ kind: "is_not_empty" }, "x")).toBe(true)
  })
  test("equals matches scalar literals", () => {
    expect(matcherMatches({ kind: "equals", value: "done" }, "done")).toBe(true)
    expect(matcherMatches({ kind: "equals", value: "done" }, "todo")).toBe(false)
    expect(matcherMatches({ kind: "equals", value: 42 }, 42)).toBe(true)
  })
  test("equals on objects compares structurally", () => {
    expect(matcherMatches({ kind: "equals", value: { a: 1, b: 2 } }, { a: 1, b: 2 })).toBe(true)
    expect(matcherMatches({ kind: "equals", value: { a: 1 } }, { a: 2 })).toBe(false)
  })
  test("not_equals inverts equals", () => {
    expect(matcherMatches({ kind: "not_equals", value: "done" }, "todo")).toBe(true)
    expect(matcherMatches({ kind: "not_equals", value: "done" }, "done")).toBe(false)
  })
  test("truthy uses JS truthiness", () => {
    expect(matcherMatches({ kind: "truthy" }, "x")).toBe(true)
    expect(matcherMatches({ kind: "truthy" }, 1)).toBe(true)
    expect(matcherMatches({ kind: "truthy" }, "")).toBe(false)
    expect(matcherMatches({ kind: "truthy" }, 0)).toBe(false)
    expect(matcherMatches({ kind: "truthy" }, null)).toBe(false)
  })
  test("falsy is the inverse of truthy", () => {
    expect(matcherMatches({ kind: "falsy" }, null)).toBe(true)
    expect(matcherMatches({ kind: "falsy" }, 0)).toBe(true)
    expect(matcherMatches({ kind: "falsy" }, "x")).toBe(false)
  })
})

describe("evaluateTrigger — property_changed_to", () => {
  test("fires when property in patch satisfies `to`", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      to: { kind: "is_not_empty" },
    }
    const event = updatedEvent({ patch: { [PROP]: 12345 } })
    expect(evaluateTrigger(trigger, event)).toBe(true)
  })

  test("does not fire when property absent from patch", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      to: { kind: "is_not_empty" },
    }
    const event = updatedEvent({ patch: { title: "renamed" } })
    expect(evaluateTrigger(trigger, event)).toBe(false)
  })

  test("does not fire when `to` matcher rejects new value", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      to: { kind: "is_not_empty" },
    }
    const event = updatedEvent({ patch: { [PROP]: null } })
    expect(evaluateTrigger(trigger, event)).toBe(false)
  })

  test("respects `from` matcher when set", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      from: { kind: "is_empty" },
      to: { kind: "is_not_empty" },
    }
    expect(
      evaluateTrigger(trigger, updatedEvent({ patch: { [PROP]: 1 }, oldValues: { [PROP]: null } }))
    ).toBe(true)
    expect(
      evaluateTrigger(trigger, updatedEvent({ patch: { [PROP]: 2 }, oldValues: { [PROP]: 1 } }))
    ).toBe(false)
  })

  test("fires on `created` events when watched property in fields satisfies `to`", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      to: { kind: "is_not_empty" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { [PROP]: 1 } }))).toBe(true)
  })

  test("does not fire on `created` events when watched property absent from fields", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      to: { kind: "is_not_empty" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { other: 1 } }))).toBe(false)
  })

  test("does not fire on `created` events when watched property fails `to` matcher", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      to: { kind: "is_not_empty" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { [PROP]: null } }))).toBe(false)
  })

  test("does not fire on `created` events when `from` matcher is set (update-only opt-in)", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      from: { kind: "is_empty" },
      to: { kind: "is_not_empty" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { [PROP]: 1 } }))).toBe(false)
  })

  test("does not fire on `deleted` events", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: PROP,
      to: { kind: "is_empty" },
    }
    const event: EmittedEvent = {
      type: "deleted",
      rowId: "row-1",
      pageTypeSlug: "task",
      oldValues: { [PROP]: 1 },
    }
    expect(evaluateTrigger(trigger, event)).toBe(false)
  })

  test("equals matcher compares scalars", () => {
    const trigger: Trigger = {
      kind: "property_changed_to",
      propertyId: "status",
      to: { kind: "equals", value: "done" },
    }
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { status: "done" } }))).toBe(true)
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { status: "todo" } }))).toBe(false)
  })

  test("unknown trigger kind returns false (defensive)", () => {
    const trigger = asTrigger({ kind: "all_of", triggers: [] })
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { [PROP]: 1 } }))).toBe(false)
  })
})
