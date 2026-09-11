import {
  unreadable,
  writtenIn,
} from "akasha/changes/modules/guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "akasha/changes/modules/guarding/change-guarding.module.types.ts"
import { namedUnder, pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { identityOf } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"

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
    for (const path of writtenIn(given).keys()) {
      if (!pageNamed(path, under)) continue
      const named = namedUnder(path, under)
      if (named === null) continue
      const why = twiceAt(given, path, named.slug)
      if (why !== null) return why
    }
    return null
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = fieldKeyNotCarriedTwice
