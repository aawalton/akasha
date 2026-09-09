import type { Named } from "@akasha/indexes"
import type { Known } from "@akasha/indexes/reaching"
import { pageNamed, partedIn } from "@akasha/pages/page-file-name"
import { judging } from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

function hangingOn(path: string, namer: Named): string {
  const names = `\`${namer.path}\` names \`${path}\` as its \`${namer.propertySlug}\``
  return `${names}, and \`${path}\` is taken away`
}

function namerIn(given: Guarding, id: string, known: Known): Named | undefined {
  return given.shadow.index.namersOf(id).find((one) => {
    const holder = partedIn(one.path)?.pageType
    return holder === undefined || !known.mortal(holder)
  })
}

function hangingIn(given: Guarding, taken: readonly string[]): string | null {
  const index = given.shadow.index
  const pageTypes = index.pageTypesIn()
  const known = index.knownIn()
  for (const path of taken) {
    if (!pageNamed(path, pageTypes)) continue
    const own = partedIn(path)?.pageType
    if (own === undefined || known.mortal(own)) continue
    for (const one of given.before.index.listedByPath(path)) {
      const namer = namerIn(given, one.id, known)
      if (namer !== undefined) return hangingOn(path, namer)
    }
  }
  return null
}

export function relationNotLeftHanging(given: Guarding): string | null {
  return judging(given, hangingIn)
}

export const runGuard: Guard = relationNotLeftHanging
