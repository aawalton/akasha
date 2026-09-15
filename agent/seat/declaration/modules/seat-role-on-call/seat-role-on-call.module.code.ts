import { onceInCall } from "akasha/command/modules/during-call/during-call.module.code.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const ROLE = "role"

const ON_CALL = "onCall"

const HELD = "role-on-call"

function onCallUnder(roleSlug: string): boolean {
  const root = akashaRoot()
  const listed = listedAt(root, ROLE, roleSlug)[0]
  if (listed === undefined) return false
  return valueByPath(root, listed.path)?.[ON_CALL] === true
}

export function roleIsOnCall(roleSlug: string | null): boolean {
  if (roleSlug === null || roleSlug === "") return false
  return onceInCall(`${HELD}/${roleSlug}`, () => onCallUnder(roleSlug))
}
