import { filedIn } from "../../../pages-system/indexes/index/index-identity/index-identity.index.code.ts"
import {
  pageTypesIn,
  uniquePropertiesAt,
  uniquePropertiesIn,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  indexIn,
  standingNamed,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  type Reading,
  readingAt,
} from "../../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"
import { type Carried, carriedBy } from "../relation-resolves/relation-resolves.check.code.ts"

export type Stated = {
  readonly path: string
  readonly scope: string
  readonly propertySlug: string
  readonly said: string
}

export function uniqueAcross(
  reading: Reading,
  carried: readonly Carried[]
): ReadonlyMap<string, string> {
  return new Map<string, string>([
    ...uniquePropertiesAt(reading),
    ...uniquePropertiesIn(carried.map((one) => one.value)),
  ])
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
  const found = new Map<string, Stated[]>()
  for (const one of stated) {
    const held = found.get(keyOf(one)) ?? []
    held.push(one)
    found.set(keyOf(one), held)
  }
  return found
}

const CARRIES = "carries it too in this change"

const STANDS = "already stands with it"

function reasonFor(one: Stated, other: string, how: string): string {
  return (
    `states \`${one.propertySlug}\` \`${one.said}\`, and \`${other}\` ${how} — ` +
    `the index files one page at \`${keyOf(one)}\``
  )
}

export function identifierNamesOnePage(leaving: Leaving): readonly Judged[] {
  const reading = readingAt(indexIn(leaving.root))
  const carried = carriedBy(leaving, pageTypesIn(reading))
  if (carried.length === 0) return []
  const touched = new Set(leaving.changed)
  const said: Judged[] = []
  for (const held of statedByKey(statedBy(carried, uniqueAcross(reading, carried))).values()) {
    const one = held[0]
    if (one === undefined) continue
    for (const later of held.slice(1)) {
      said.push({ path: later.path, reason: reasonFor(later, one.path, CARRIES) })
    }
    const standing = standingNamed(reading, one.scope, one.propertySlug, one.said).filter(
      (found) => !touched.has(found.path)
    )
    const first = standing[0]
    if (first === undefined) continue
    for (const each of held) {
      said.push({ path: each.path, reason: reasonFor(each, first.path, STANDS) })
    }
  }
  return said
}
