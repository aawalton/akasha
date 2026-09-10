import type { Listed } from "@akasha/indexes"
import { filedIn, keyFor } from "@akasha/indexes/identity"
import type { Identifying } from "@akasha/pages/page-type-properties"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Carried } from "../relation-resolves/relation-resolves.code-check.decision.code.ts"

export type Stated = {
  readonly path: string
  readonly uniqueKind: string
  readonly scope: string
  readonly propertySlug: string
  readonly said: string
}

export type Listing = (
  uniqueKind: string,
  scope: string,
  propertySlug: string,
  said: string
) => readonly Listed[]

export function statedBy(carried: readonly Carried[], identifying: Identifying): readonly Stated[] {
  return carried.flatMap((one) =>
    filedIn(one.value, identifying).map((held) => ({
      path: one.path,
      uniqueKind: held.uniqueKind,
      scope: held.scope,
      propertySlug: held.propertySlug,
      said: held.said,
    }))
  )
}

export function keyOf(one: Stated): string {
  return keyFor(one)
}

export function statedByKey(stated: readonly Stated[]): ReadonlyMap<string, readonly Stated[]> {
  return Map.groupBy(stated, keyOf)
}

const CARRIES = "carries it too in this change"

const CARRIES_ALREADY = "carries it already"

function reasonFor(one: Stated, other: string, how: string): string {
  return (
    `states \`${one.propertySlug}\` \`${one.said}\`, and \`${other}\` ${how} — ` +
    `the index files one page at \`${keyOf(one)}\``
  )
}

export function refusalsOf(stated: readonly Stated[], listed: Listing): readonly Judged[] {
  const said: Judged[] = []
  for (const held of statedByKey(stated).values()) {
    const one = held[0]
    if (one === undefined) continue
    const found = listed(one.uniqueKind, one.scope, one.propertySlug, one.said)
    if (found.length < 2) continue
    const carrying = new Set(held.map((each) => each.path))
    const elsewhere = found.find((each) => !carrying.has(each.path))
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
