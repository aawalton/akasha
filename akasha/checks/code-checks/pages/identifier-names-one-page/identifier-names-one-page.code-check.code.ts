import { filedIn } from "@akasha/indexes/identity"
import type { Change } from "@akasha/pages-system/change"
import { type Identifying, identifyingFrom } from "@akasha/pages-system/page-type-properties"
import type { Shadow } from "@akasha/pages-system/shadow"
import { input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { type Carried, carriedBy } from "../relation-resolves/relation-resolves.code-check.code.ts"

export type Stated = {
  readonly path: string
  readonly scope: string
  readonly propertySlug: string
  readonly said: string
}

export function statedBy(carried: readonly Carried[], identifying: Identifying): readonly Stated[] {
  return carried.flatMap((one) =>
    filedIn(one.value, identifying).map((held) => ({
      path: one.path,
      scope: held.scope,
      propertySlug: held.propertySlug,
      said: held.said,
    }))
  )
}

export function keyOf(one: Stated): string {
  return `${one.scope}/${one.propertySlug}/${one.said}`
}

export function statedByKey(stated: readonly Stated[]): ReadonlyMap<string, readonly Stated[]> {
  return Map.groupBy(stated, keyOf)
}

const CARRIES = "carries it too in this change"

const CARRIES_ALREADY = "already stands with it"

function reasonFor(one: Stated, other: string, how: string): string {
  return (
    `states \`${one.propertySlug}\` \`${one.said}\`, and \`${other}\` ${how} — ` +
    `the index files one page at \`${keyOf(one)}\``
  )
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  const said: Judged[] = []
  const identifying = identifyingFrom(shadow.index.sourceIn())
  for (const held of statedByKey(statedBy(carried, identifying)).values()) {
    const one = held[0]
    if (one === undefined) continue
    const listed = shadow.index.listedNamed(one.scope, one.propertySlug, one.said)
    if (listed.length < 2) continue
    const carrying = new Set(held.map((each) => each.path))
    const elsewhere = listed.find((found) => !carrying.has(found.path))
    if (elsewhere === undefined) {
      for (const later of held.slice(1)) {
        said.push({ path: later.path, reason: reasonFor(later, one.path, CARRIES) })
      }
      continue
    }
    for (const each of held) {
      said.push({ path: each.path, reason: reasonFor(each, elsewhere.path, CARRIES_ALREADY) })
    }
  }
  return said
}

export const identifierNamesOnePage = input(PAGES, refusalsIn)
