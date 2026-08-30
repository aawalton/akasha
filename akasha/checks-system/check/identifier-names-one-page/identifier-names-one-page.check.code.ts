import { filedIn } from "../../../pages-system/indexes/index/index-identity/index-identity.index.code.ts"
import {
  pageTypesIn,
  uniquePropertiesAt,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { standingNamed } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import type { Change, Judged } from "../../judging/judging.module.code.ts"
import { type Carried, carriedBy } from "../relation-resolves/relation-resolves.check.code.ts"

export type Stated = {
  readonly path: string
  readonly scope: string
  readonly propertySlug: string
  readonly said: string
}

export function statedBy(
  carried: readonly Carried[],
  unique: ReadonlyMap<string, string>
): readonly Stated[] {
  return carried.flatMap((one) =>
    filedIn(one.value, unique).map((held) => ({
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

const STANDS = "already stands with it"

function reasonFor(one: Stated, other: string, how: string): string {
  return (
    `states \`${one.propertySlug}\` \`${one.said}\`, and \`${other}\` ${how} — ` +
    `the index files one page at \`${keyOf(one)}\``
  )
}

export function identifierNamesOnePage(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, pageTypesIn(shadow.reading))
  if (carried.length === 0) return []
  const said: Judged[] = []
  for (const held of statedByKey(statedBy(carried, uniquePropertiesAt(shadow.reading))).values()) {
    const one = held[0]
    if (one === undefined) continue
    const standing = standingNamed(shadow.reading, one.scope, one.propertySlug, one.said)
    if (standing.length < 2) continue
    const carrying = new Set(held.map((each) => each.path))
    const elsewhere = standing.find((found) => !carrying.has(found.path))
    if (elsewhere === undefined) {
      for (const later of held.slice(1)) {
        said.push({ path: later.path, reason: reasonFor(later, one.path, CARRIES) })
      }
      continue
    }
    for (const each of held) {
      said.push({ path: each.path, reason: reasonFor(each, elsewhere.path, STANDS) })
    }
  }
  return said
}
