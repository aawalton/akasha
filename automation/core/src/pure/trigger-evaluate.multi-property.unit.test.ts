import { describe, expect, test } from "bun:test"
import { evaluateTrigger } from "./trigger-evaluate"
import { asTrigger, createdEvent, updatedEvent } from "./trigger-evaluate.test-helpers"

describe("evaluateTrigger — property_changed_to multi-property", () => {
  test("fires when first listed property is in patch with matching `to`", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    const event = updatedEvent({ patch: { a: 1 } })
    expect(evaluateTrigger(trigger, event)).toBe(true)
  })

  test("fires when middle listed property is in patch with matching `to`", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    const event = updatedEvent({ patch: { b: "value" } })
    expect(evaluateTrigger(trigger, event)).toBe(true)
  })

  test("fires when last listed property is in patch with matching `to`", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    const event = updatedEvent({ patch: { c: true } })
    expect(evaluateTrigger(trigger, event)).toBe(true)
  })

  test("does not fire when none of the listed properties are in patch", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    const event = updatedEvent({ patch: { unrelated: 1 } })
    expect(evaluateTrigger(trigger, event)).toBe(false)
  })

  test("does not fire when listed property in patch fails `to` matcher", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    const event = updatedEvent({ patch: { a: null } })
    expect(evaluateTrigger(trigger, event)).toBe(false)
  })

  test("returns true exactly once when multiple listed properties match (single dispatch)", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b", "c"],
      to: { kind: "is_not_empty" },
    })
    const event = updatedEvent({ patch: { a: 1, b: 2 } })
    expect(evaluateTrigger(trigger, event)).toBe(true)
  })

  test("single-property propertyIds: ['a'] behaves identically to legacy single form", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { a: 1 } }))).toBe(true)
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { other: 1 } }))).toBe(false)
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { a: null } }))).toBe(false)
  })

  test("`from` matcher applies to the matching property's old value (per-property check)", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b"],
      from: { kind: "is_empty" },
      to: { kind: "is_not_empty" },
    })
    expect(
      evaluateTrigger(trigger, updatedEvent({ patch: { b: 2 }, oldValues: { a: 99, b: null } }))
    ).toBe(true)
    expect(
      evaluateTrigger(trigger, updatedEvent({ patch: { b: 2 }, oldValues: { a: null, b: 1 } }))
    ).toBe(false)
  })

  test("fires on `created` events with multi-property trigger when any listed property in fields satisfies `to`", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { a: 1, b: 2 } }))).toBe(true)
  })

  test("does not fire on `created` events with multi-property trigger when no listed property is in fields", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b"],
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { unrelated: 1 } }))).toBe(false)
  })

  test("does not fire on `created` events with multi-property trigger when `from` matcher is set", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["a", "b"],
      from: { kind: "is_empty" },
      to: { kind: "is_not_empty" },
    })
    expect(evaluateTrigger(trigger, createdEvent({ fields: { a: 1, b: 2 } }))).toBe(false)
  })

  test("multi-property `to: equals` checks each property's own value", () => {
    const trigger = asTrigger({
      kind: "property_changed_to",
      propertyIds: ["status", "phase"],
      to: { kind: "equals", value: "done" },
    })
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { status: "done" } }))).toBe(true)
    expect(evaluateTrigger(trigger, updatedEvent({ patch: { phase: "done" } }))).toBe(true)
    expect(
      evaluateTrigger(trigger, updatedEvent({ patch: { status: "todo", phase: "wip" } }))
    ).toBe(false)
  })
})
