import type { Change } from "@akasha/pages-system/change"
import { type Carried as Declared, identityOf } from "@akasha/pages-system/page-type-properties"
import type { Shadow } from "@akasha/pages-system/shadow"
import { input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  type Held,
  judgedIn,
  looseningIn,
} from "../key-names-one-property/key-names-one-property.code-check.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.code.ts"

function fallen(was: number | null, now: number | null): boolean {
  return now !== null && (was === null || now < was)
}

function narrows(nearer: Declared, further: Declared): boolean {
  if (nearer.required && !further.required) return true
  if (fallen(further.max, nearer.max)) return true
  if (fallen(further.total, nearer.total)) return true
  if (nearer.secret && !further.secret) return true
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

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  const said: Judged[] = []
  for (const one of judgedIn(carried, shadow)) {
    if (one.descends) said.push(...restatingIn(one, shadow))
  }
  return said
}

export const restatementNarrowsSomething = input(PAGES, refusalsIn)
