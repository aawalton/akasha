import {
  unreadable,
  writtenIn,
} from "akasha/changes/modules/guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "akasha/changes/modules/guarding/change-guarding.module.types.ts"
import { pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  eachTarget,
  namesIn,
  namesMortal,
  namingsIn,
  reaches,
  type Shaped,
} from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import { slugOf, textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

function danglingAt(given: Guarding, known: Shaped, path: string): string | null {
  const value = given.shadow.pageOf(path)
  if (value === null) return null
  const own = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  if (own !== null && known.mortal(slugOf(own))) return null
  for (const one of namingsIn(value, known)) {
    const wanted = known.targetOf(one.propertySlug)
    if (eachTarget(wanted).length === 0) continue
    for (const named of namesIn(one.held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        if (namesMortal(named, wanted, known)) continue
        return `\`${path}\` states \`${one.said}\`, and ${reached.refused}`
      }
    }
  }
  return null
}

export function relationReachesAPage(given: Guarding): string | null {
  try {
    const pageTypes = given.shadow.index.pageTypesIn()
    const known = given.shadow.index.knownIn()
    for (const path of writtenIn(given).keys()) {
      if (!pageNamed(path, pageTypes)) continue
      const why = danglingAt(given, known, path)
      if (why !== null) return why
    }
    return given.shadow.refusals()[0] ?? null
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = relationReachesAPage
