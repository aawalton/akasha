import { describe, expect, test } from "bun:test"
import { evaluateTrigger } from "./trigger-evaluate"
import { asTrigger, createdEvent, updatedEvent } from "./trigger-evaluate.test-helpers"
import type { EmittedEvent, Trigger } from "./types"

describe("evaluateTrigger — created", () => {
  test("fires when watched property in fields satisfies `to`", () => {
    const trigger: Trigger = {
      kind: "created",
      propertyId: "status",
      to: { kind: "equals", value: "open" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { status: "open" } }))).toBe(true)
  })

  test("does not fire when watched property absent from fields", () => {
    const trigger: Trigger = {
      kind: "created",
      propertyId: "status",
      to: { kind: "is_not_empty" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { title: "x" } }))).toBe(false)
  })

  test("does not fire when `to` matcher rejects field value", () => {
    const trigger: Trigger = {
      kind: "created",
      propertyId: "status",
      to: { kind: "equals", value: "open" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { status: "closed" } }))).toBe(false)
  })

  test("`is_empty` matcher matches null field value (set-on-create with explicit null)", () => {
    const trigger: Trigger = {
      kind: "created",
      propertyId: "completedAt",
      to: { kind: "is_empty" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { completedAt: null } }))).toBe(true)
  })

  test("does not fire on `updated` events", () => {
    const trigger: Trigger = {
      kind: "created",
      propertyId: "status",
      to: { kind: "equals", value: "open" },
    }
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { status: "open" } }))).toBe(false)
  })

  test("does not fire on `deleted` events", () => {
    const trigger: Trigger = {
      kind: "created",
      propertyId: "status",
      to: { kind: "equals", value: "open" },
    }
    const event: EmittedEvent = {
      type: "deleted",
      rowId: "row-1",
      pageTypeSlug: "task",
      oldValues: { status: "open" },
    }
    expect(evaluateTrigger(trigger, event)).toBe(false)
  })

  test("multi-property `propertyIds` fires when first matches", () => {
    const trigger = asTrigger({
      kind: "created",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { a: 1 } }))).toBe(true)
  })

  test("multi-property `propertyIds` fires when middle matches", () => {
    const trigger = asTrigger({
      kind: "created",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { b: "value" } }))).toBe(true)
  })

  test("multi-property `propertyIds` fires when last matches", () => {
    const trigger = asTrigger({
      kind: "created",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { c: true } }))).toBe(true)
  })

  test("multi-property `propertyIds` does not fire when none match", () => {
    const trigger = asTrigger({
      kind: "created",
      propertyIds: ["a", "b"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { unrelated: 1 } }))).toBe(false)
  })

  test("multi-property `propertyIds` does not fire when listed property fails `to`", () => {
    const trigger = asTrigger({
      kind: "created",
      propertyIds: ["a", "b"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { a: null } }))).toBe(false)
  })

  test("multi-property fires once when multiple listed properties match", () => {
    const trigger = asTrigger({
      kind: "created",
      propertyIds: ["a", "b"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { a: 1, b: 2 } }))).toBe(true)
  })

  test("legacy single `propertyId` shape behaves identically to one-element propertyIds", () => {
    const trigger: Trigger = {
      kind: "created",
      propertyId: "status",
      to: { kind: "equals", value: "open" },
    }
    expect(evaluateTrigger(trigger, createdEvent({ fields: { status: "open" } }))).toBe(true)
    expect(evaluateTrigger(trigger, createdEvent({ fields: { status: "closed" } }))).toBe(false)
    expect(evaluateTrigger(trigger, createdEvent({ fields: { other: "open" } }))).toBe(false)
  })
})
