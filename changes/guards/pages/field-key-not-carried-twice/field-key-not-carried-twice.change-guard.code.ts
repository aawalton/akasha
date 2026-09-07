import { namedUnder, pageNamed } from "@akasha/pages/page-file-name"
import { identityOf } from "@akasha/pages/page-type-properties"
import { unreadable } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "../../../modules/change-guarding/change-guarding.module.types.ts"

const PAGE_PROPERTY = "page-property"

function reasonFor(path: string, key: string, first: string, second: string): string {
  return (
    `\`${path}\` carries the key \`${key}\` from \`${first}\` and from \`${second}\`, ` +
    `and no two fields carry one key`
  )
}

function twiceAt(given: Guarding, path: string, slug: string): string | null {
  const value = given.shadow.pageOf(path)
  if (value === null) return null
  const held = new Map<string, string>()
  for (const one of given.shadow.index.carriedIn(value, slug)) {
    const first = held.get(one.key)
    if (first !== undefined) return reasonFor(path, one.key, first, identityOf(one))
    held.set(one.key, identityOf(one))
  }
  return null
}

export function fieldKeyNotCarriedTwice(given: Guarding): string | null {
  try {
    const under = given.shadow.index.kindsUnder(PAGE_PROPERTY)
    for (const one of given.said.edits) {
      if (one.body === null || !pageNamed(one.path, under)) continue
      const named = namedUnder(one.path, under)
      if (named === null) continue
      const why = twiceAt(given, one.path, named.slug)
      if (why !== null) return why
    }
    return null
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = fieldKeyNotCarriedTwice
