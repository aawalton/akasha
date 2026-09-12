import { textWas } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { namedUnder, pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  filedById,
  reaches,
  recordsIn,
} from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"
import {
  textAt,
  textsAt,
  type Value,
} from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE_PROPERTY = "page-property"

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

function declaredWere(change: Change, path: string): readonly string[] {
  const text = textWas(change, path)
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

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const under = shadow.index.kindsUnder(PAGE_PROPERTY)
  const pageTypes = shadow.index.pageTypesIn()
  const known = shadow.index.knownIn()
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): undefined => {
    if (judged.has(path)) return
    judged.add(path)
    if (DECLARES.some((slug) => shadow.index.idsNaming(id, slug).length > 0)) return
    said.push({ path, reason: reasonFor(shown) })
  }
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    for (const shown of declaredWere(change, path)) {
      const reached = reaches(shown, PAGE_PROPERTY, known)
      if (!("id" in reached)) continue
      const listed = filedById(known, reached.id)
      if (listed === null) continue
      judge(listed.path, reached.id, shown)
    }
    if (change.after(path) === null) continue
    const held = namedUnder(path, under)
    if (held === null) continue
    const one = shadow.index.listedByPath(path).find((filed) => filed.path === path)
    if (one === undefined) continue
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}
