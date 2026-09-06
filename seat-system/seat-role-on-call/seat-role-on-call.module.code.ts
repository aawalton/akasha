import { onceInCall } from "@akasha/command-system/during-call"
import { akashaRoot } from "@akasha/pages/checkout-roots"
import { valuesOfType } from "@akasha/pages/index-reading"

const ROLE = "role"

const SLUG = "slug"

const ON_CALL = "onCall"

const HELD = "on-call-roles"

// WHICH ROLES ARE ON CALL, TAKEN FROM WHAT THE ROLE PAGES CARRY RATHER THAN FROM THE PAGES. The
// value index holds one line for each role with that role's whole value on it, so the whole set is
// one file read however many roles there are — where opening each role page in turn would be one
// read for each of them, asked once for every seat drawn.
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

// THE SET IS TAKEN ONCE FOR EACH CALL RATHER THAN ONCE FOR EACH SEAT, which is the same bargain
// the seat listing already makes. Outside a call it is read afresh, because the editor asks this
// from one long-lived process and a role turned on call under it is the answer it must next give.
export function onCallRoles(): ReadonlySet<string> {
  return onceInCall(HELD, () => onCallRolesIn(valuesOfType(akashaRoot(), ROLE)))
}

export function roleIsOnCall(roleSlug: string | null): boolean {
  return roleSlug !== null && roleSlug !== "" && onCallRoles().has(roleSlug)
}
