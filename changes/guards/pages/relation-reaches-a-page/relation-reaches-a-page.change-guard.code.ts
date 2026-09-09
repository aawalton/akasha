import { eachTarget, namesIn, namingsIn, reaches, type Shaped } from "@akasha/indexes/reaching"
import { pageNamed } from "@akasha/pages/page-file-name"
import { unreadable, writtenIn } from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

function danglingAt(given: Guarding, known: Shaped, path: string): string | null {
  const value = given.shadow.pageOf(path)
  if (value === null) return null
  for (const one of namingsIn(value, known)) {
    const wanted = known.targetOf(one.propertySlug)
    if (eachTarget(wanted).length === 0) continue
    for (const named of namesIn(one.held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
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
    return null
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = relationReachesAPage
