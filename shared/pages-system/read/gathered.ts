import type { Value, Values } from "../formula/formula.ts"
import { cycleAmong, familyOf } from "../query/expands.ts"
import { type Page, checkQuery, runQuery } from "../query/query.ts"
import { type Repo, addressIn } from "./address.ts"
import {
  PAGE_TYPE,
  PROPERTY,
  declarationsFrom,
  extendingFrom,
  pageTypesIn,
  propertiesIn,
} from "./declared.ts"
import { type Stated, everyPageUnder, statedAt } from "./files.ts"
import { valuedAs } from "./held.ts"

export const gatheredFor = (
  repo: Repo,
  pageType: string,
  keys: readonly string[],
  now: number
): readonly Page[] | string => {
  const found = everyPageUnder(repo.root)
  if (typeof found === "string") return found

  const held = new Map<string, Stated | string>()
  const read = (at: string): Stated | string => {
    const already = held.get(at)
    if (already !== undefined) return already
    const stated = statedAt(repo.root, at)
    held.set(at, stated)
    return stated
  }

  const types = pageTypesIn(found.get(PAGE_TYPE) ?? [], read)
  const extending = extendingFrom(types)
  const family = familyOf(pageType, extending)
  if ("ring" in family) return cycleAmong(family.ring)
  const declaring = declarationsFrom(
    types,
    propertiesIn(found.get(PROPERTY) ?? [], read),
    family.family
  )

  const head = declaring.get(pageType)
  if (head === undefined) return `no page type \`${pageType}\` stands under ${repo.root}`
  const checked = checkQuery({ pageType, expands: true, keys: [...keys] }, head, extending, declaring)
  if (!checked.ok) return checked.message

  const pages: Page[] = []
  for (const kind of checked.pageTypes) {
    const declared = declaring.get(kind)
    if (declared === undefined) return `no page type \`${kind}\` stands under ${repo.root}`
    for (const at of found.get(kind) ?? []) {
      const stated = read(at)
      if (typeof stated === "string") return `${at} — ${stated}`
      const properties: Record<string, Value> = {}
      for (const [key, property] of Object.entries(declared.properties)) {
        properties[key] = valuedAs(stated[key], property.type)
      }
      pages.push({ at: addressIn(repo.repo, at), values: { now, properties } satisfies Values })
    }
  }
  return runQuery(checked, pages)
}
