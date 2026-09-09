import { akashaRoot } from "@akasha/pages/checkout-roots"
import { valuesOfType } from "@akasha/pages/index-reading"
import { onceInCall } from "../../commands/modules/during-call/during-call.module.code.ts"

const ROLE = "role"

const SLUG = "slug"

const ON_CALL = "onCall"

const HELD = "on-call-roles"

export function onCallRolesIn(values: readonly { readonly value: unknown }[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of values) {
    const held = one.value
    if (held === null || typeof held !== "object" || Array.isArray(held)) continue
    const row = held as Record<string, unknown>
    const slug = row[SLUG]
    if (row[ON_CALL] === true && typeof slug === "string" && slug !== "") found.add(slug)
  }
  return found
}

export function onCallRoles(): ReadonlySet<string> {
  return onceInCall(HELD, () => onCallRolesIn(valuesOfType(akashaRoot(), ROLE)))
}

export function roleIsOnCall(roleSlug: string | null): boolean {
  return roleSlug !== null && roleSlug !== "" && onCallRoles().has(roleSlug)
}
