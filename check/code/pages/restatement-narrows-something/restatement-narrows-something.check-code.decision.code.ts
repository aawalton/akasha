import {
  type Held,
  judgedIn,
  looseningIn,
  underEach,
  widthOf,
} from "akasha/check/code/pages/key-names-one-property/key-names-one-property.check-code.decision.code.ts"
import { carriedBy } from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.code.ts"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  type Carried as Declared,
  identityOf,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

function fallen(was: number | null, now: number | null): boolean {
  return now !== null && (was === null || now < was)
}

function narrows(nearer: Declared, further: Declared): boolean {
  if (nearer.required && !further.required) return true
  if (fallen(further.maxCount, nearer.maxCount)) return true
  if (fallen(further.maxLength, nearer.maxLength)) return true
  if (nearer.secret && !further.secret) return true
  if (widthOf(nearer) < widthOf(further)) return true
  return nearer.uncommitted && !further.uncommitted
}

function narrowingNothing(nearer: Declared, further: Declared): string {
  return (
    `restates \`${identityOf(nearer)}\` at \`${nearer.key}\` in \`${nearer.declaredBy}\` over the ` +
    `declaration in \`${further.declaredBy}\`, and narrows nothing — an inherited property is ` +
    `restated only to narrow it`
  )
}

function restatingIn(one: Held, paged: Paged): readonly Judged[] {
  const said: Judged[] = []
  const declared = paged.index.declarationsOf(one.slug)
  for (const held of Map.groupBy(declared, identityOf).values()) {
    for (const [at, nearer] of held.entries()) {
      const further = held[at + 1]
      if (further === undefined || further.declaredBy === nearer.declaredBy) continue
      if (looseningIn(nearer, further) !== null || narrows(nearer, further)) continue
      said.push({ path: one.path, reason: narrowingNothing(nearer, further) })
    }
  }
  return said
}

export function restatementsIn(held: readonly Held[], paged: Paged): readonly Judged[] {
  const said: Judged[] = []
  for (const one of held) {
    if (one.descends) said.push(...restatingIn(one, paged))
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  return restatementsIn(underEach(judgedIn(carried, shadow), shadow), shadow)
}
