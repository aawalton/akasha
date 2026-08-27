import { describe, expect, test } from "bun:test"
import { evaluateTrigger } from "./trigger-evaluate"
import type { EmittedEvent, Trigger } from "./types"

function asTrigger(value: unknown): Trigger {
  return value as Trigger
}

function updatedEvent(opts: {
  patch: Record<string, unknown>
  oldValues?: Record<string, unknown>
  pageTypeSlug?: string
}): EmittedEvent {
  return {
    type: "updated",
    rowId: "row-1",
    pageTypeSlug: opts.pageTypeSlug ?? "task",
    patch: opts.patch,
    oldValues: opts.oldValues ?? {},
  }
}

function createdEvent(opts: {
  fields: Record<string, unknown>
  pageTypeSlug?: string
}): EmittedEvent {
  return {
    type: "created",
    rowId: "row-1",
    pageTypeSlug: opts.pageTypeSlug ?? "task",
    fields: opts.fields,
  }
}

describe("evaluateTrigger — invoked", () => {
  test("fires on an updated event whose patch contains the watched key", () => {
    const trigger = asTrigger({ kind: "invoked", propertyIds: ["trainButton"] })
    const event = updatedEvent({ patch: { trainButton: 1 } })
    expect(evaluateTrigger(trigger, event)).toBe(true)
  })

  test("does not fire when the patch has only some other key", () => {
    const trigger = asTrigger({ kind: "invoked", propertyIds: ["trainButton"] })
    const event = updatedEvent({ patch: { title: "renamed" } })
    expect(evaluateTrigger(trigger, event)).toBe(false)
  })

  test("does not fire on a created event (any non-updated type)", () => {
    const trigger = asTrigger({ kind: "invoked", propertyIds: ["trainButton"] })
    const event = createdEvent({ fields: { trainButton: 1 } })
    expect(evaluateTrigger(trigger, event)).toBe(false)
  })

  test("multi-propertyIds fires when the patch contains any listed key", () => {
    const trigger = asTrigger({ kind: "invoked", propertyIds: ["a", "b"] })
    const event = updatedEvent({ patch: { b: "value" } })
    expect(evaluateTrigger(trigger, event)).toBe(true)
  })
})
