import type { Change } from "@akasha/pages/change"
import { type Carried as Declared, identityOf } from "@akasha/pages/page-type-properties"
import type { Shadow } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  type Held,
  judgedIn,
  looseningIn,
  underEach,
  widthOf,
} from "../key-names-one-property/key-names-one-property.code-check.decision.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.decision.code.ts"

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

export function restatingIn(one: Held, shadow: Shadow): readonly Judged[] {
  const said: Judged[] = []
  const declared = shadow.index.declarationsOf(one.slug)
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

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  const said: Judged[] = []
  for (const one of underEach(judgedIn(carried, shadow), shadow)) {
    if (one.descends) said.push(...restatingIn(one, shadow))
  }
  return said
}
