import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import { assertNever } from "@shared/utils-narrow"
import type { EmittedEvent, Matcher, Trigger } from "./types"

function isEmpty(value: unknown): boolean {
  return value === null || value === undefined
}

export function matcherMatches(matcher: Matcher, value: unknown): boolean {
  switch (matcher.kind) {
    case "is_empty":
      return isEmpty(value)
    case "is_not_empty":
      return !isEmpty(value)
    case "equals":
      return jsonEqual(value, matcher.value)
    case "not_equals":
      return !jsonEqual(value, matcher.value)
    case "truthy":
      return Boolean(value)
    case "falsy":
      return !value
    default:
      return assertNever(matcher)
  }
}

function jsonEqual(a: unknown, b: ReadonlyJSONValue): boolean {
  if (a === b) return true
  if (a === undefined) return false
  if (a === null || b === null) return a === b
  if (typeof a !== typeof b) return false
  if (typeof a === "object") return JSON.stringify(a) === JSON.stringify(b)
  return false
}

export function evaluateTrigger(trigger: Trigger, event: EmittedEvent): boolean {
  if (trigger.kind === "property_changed_to") {
    const propertyIds: readonly string[] =
      "propertyIds" in trigger ? trigger.propertyIds : [trigger.propertyId]

    if (event.type === "updated") {
      const safePatch = event.patch ?? {}
      for (const propertyId of propertyIds) {
        if (!Object.hasOwn(safePatch, propertyId)) continue
        const newValue = safePatch[propertyId]
        if (!matcherMatches(trigger.to, newValue)) continue
        if (trigger.from !== undefined) {
          const oldValue = event.oldValues?.[propertyId]
          if (!matcherMatches(trigger.from, oldValue)) continue
        }
        return true
      }
      return false
    }

    if (event.type === "created") {
      if (trigger.from !== undefined) return false

      const safeFields = event.fields ?? {}
      for (const propertyId of propertyIds) {
        if (!Object.hasOwn(safeFields, propertyId)) continue
        const value = safeFields[propertyId]
        if (matcherMatches(trigger.to, value)) return true
      }
      return false
    }

    return false
  }

  if (trigger.kind === "created") {
    if (event.type !== "created") return false

    const { fields } = event
    const safeFields = fields ?? {}

    const propertyIds: readonly string[] =
      "propertyIds" in trigger ? trigger.propertyIds : [trigger.propertyId]

    for (const propertyId of propertyIds) {
      if (!Object.hasOwn(safeFields, propertyId)) continue
      const value = safeFields[propertyId]
      if (matcherMatches(trigger.to, value)) return true
    }
    return false
  }

  if (trigger.kind === "invoked") {
    if (event.type !== "updated") return false
    const safePatch = event.patch ?? {}
    for (const propertyId of trigger.propertyIds) {
      if (Object.hasOwn(safePatch, propertyId)) return true
    }
    return false
  }

  return false
}
