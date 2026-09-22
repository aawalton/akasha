import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { textWas } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { filedById, reaches } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { namedUnder, pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  recordsIn,
  textAt,
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PAGE_PROPERTY = "page-property"

const ID = "id"

const DECLARES = ["page-property", "members"] as const

const DECLARED = "properties"

const MEMBERS = "members"

const SAID = "pageProperty"

const WAS_SAID = "pagePropertySlug"

function declaredIn(value: Value | null): readonly string[] {
  if (value === null) return []
  const found: string[] = []
  const held = value[DECLARED]
  if (held !== null && held !== undefined) {
    for (const one of recordsIn(held)) {
      const said = textAt(one, SAID) ?? textAt(one, WAS_SAID)
      if (said !== null) found.push(said)
    }
  }
  found.push(...(textsAt(value, MEMBERS) ?? []))
  return found
}

function declaredFrom(text: string | null): readonly string[] {
  if (text === null) return []
  return declaredIn(valueIn(text))
}

function reasonFor(shown: string): string {
  return (
    `no page type declares \`${shown}\` among its properties — a page property stands ` +
    `in the parts tree and the properties tree both, and one holding it in only the ` +
    `first is a property no page can ever carry`
  )
}

export function refusalsIn(
  paths: readonly string[],
  was: (path: string) => string | null,
  exists: (path: string) => boolean,
  paged: Paged
): readonly Judged[] {
  const under = paged.index.kindsUnder(PAGE_PROPERTY)
  const pageTypes = paged.index.pageTypesIn()
  const known = paged.index.knownIn()
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): undefined => {
    if (judged.has(path)) return
    judged.add(path)
    if (DECLARES.some((slug) => paged.index.idsNaming(id, slug).length > 0)) return
    said.push({ path, reason: reasonFor(shown) })
  }
  for (const path of paths) {
    if (!pageNamed(path, pageTypes)) continue
    for (const shown of declaredFrom(was(path))) {
      const reached = reaches(shown, PAGE_PROPERTY, known)
      if (!("id" in reached)) continue
      const listed = filedById(known, reached.id)
      if (listed === null) continue
      judge(listed.path, reached.id, shown)
    }
    if (!exists(path)) continue
    const held = namedUnder(path, under)
    if (held === null) continue
    const page = paged.pageOf(path)
    const id = page === null ? null : textAt(page, ID)
    if (id === null) continue
    judge(path, id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsIn(
    change.changed,
    (path) => textWas(change, path),
    (path) => change.after(path) !== null,
    shadow
  )
}
