import { judging, writtenIn } from "akasha/change/modules/guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "akasha/change/modules/guarding/change-guarding.module.types.ts"
import {
  namesIn,
  namingsIn,
  reaches,
  type Shaped,
} from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import type { Named } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { pageNamed, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

function hangingOn(path: string, namer: Named): string {
  const names = `\`${namer.path}\` names \`${path}\` as its \`${namer.propertySlug}\``
  return `${names}, and \`${path}\` is taken away`
}

function namesNothing(given: Guarding, known: Shaped, namer: Named): boolean {
  const value = given.shadow.pageOf(namer.path)
  if (value === null) return false
  for (const one of namingsIn(value, known)) {
    if (one.identity || one.propertySlug !== namer.propertySlug) continue
    const wanted = known.targetOf(one.propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(one.held)) {
      if ("refused" in reaches(named, wanted, known)) return true
    }
  }
  return false
}

function namerIn(
  given: Guarding,
  id: string,
  known: Shaped,
  written: ReadonlyMap<string, string>
): Named | undefined {
  return given.before.index.namersOf(id).find((one) => {
    if (written.has(one.path)) return false
    const holder = partedIn(one.path)?.pageType
    if (holder !== undefined && known.mortal(holder)) return false
    return namesNothing(given, known, one)
  })
}

function hangingIn(given: Guarding, taken: readonly string[]): string | null {
  const index = given.shadow.index
  const pageTypes = index.pageTypesIn()
  const known = index.knownIn()
  const written = writtenIn(given)
  for (const path of taken) {
    if (!pageNamed(path, pageTypes)) continue
    const own = partedIn(path)?.pageType
    if (own === undefined || known.mortal(own)) continue
    const page = given.before.index.pageByPath(path)
    const id = page === null ? null : textAt(page, ID)
    if (id === null) continue
    const namer = namerIn(given, id, known, written)
    if (namer !== undefined) return hangingOn(path, namer)
  }
  return null
}

export function relationNotLeftHanging(given: Guarding): string | null {
  return judging(given, hangingIn)
}

export const runGuard: Guard = relationNotLeftHanging
