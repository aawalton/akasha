import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { pageTypesIn } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  type Carried as Declared,
  declarationsOf,
  identityOf,
} from "../../../pages-system/page-type/page-type-properties/page-type-properties.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import { PAGES, waking } from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"
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
  const declared = declarationsOf(one.slug, shadow.reading, shadow.pageOf)
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
  const carried = carriedBy(change, pageTypesIn(shadow.reading))
  if (carried.length === 0) return []
  const said: Judged[] = []
  for (const one of judgedIn(carried, change.root, shadow)) {
    if (one.descends) said.push(...restatingIn(one, shadow))
  }
  return said
}

export const restatementNarrowsSomething = waking(PAGES, refusalsIn)
