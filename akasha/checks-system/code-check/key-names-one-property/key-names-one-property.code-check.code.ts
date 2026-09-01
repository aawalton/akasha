import { pageTypesIn } from "@akasha/indexes/entries"
import { declaringOf } from "@akasha/indexes/property-carrying"
import type { Change } from "@akasha/pages-system/change"
import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import {
  carriedIn,
  type Carried as Declared,
  declarationsOf,
  identityOf,
} from "@akasha/pages-system/page-type-properties"
import { textAt } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import { input, PAGES } from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"
import { type Carried, carriedBy } from "../relation-resolves/relation-resolves.code-check.code.ts"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const DECLARED = "properties"

const KIND = "pageTypeSlug"

const SLUG = "slug"

const ID = "id"

export type Held = {
  readonly slug: string
  readonly kind: string
  readonly path: string
  readonly descends: boolean
}

function heldAt(one: Held): string {
  return `${one.kind}/${one.slug}`
}

function taking(found: Map<string, Held>, one: Held): undefined {
  const at = heldAt(one)
  if (!found.has(at)) found.set(at, one)
}

export function judgedIn(
  carried: readonly Carried[],
  root: string,
  shadow: Shadow
): readonly Held[] {
  const under = kindsUnder(root, PAGE_TYPE, shadow.reading, shadow.pageOf)
  const properties = kindsUnder(root, PAGE_PROPERTY, shadow.reading, shadow.pageOf)
  const found = new Map<string, Held>()
  for (const one of carried) {
    const kind = textAt(one.value, KIND)
    const slug = textAt(one.value, SLUG)
    if (kind === null || slug === null) continue
    if (under.has(kind)) taking(found, { slug, kind, path: one.path, descends: true })
    else if (properties.has(kind) && Array.isArray(one.value[DECLARED])) {
      taking(found, { slug, kind, path: one.path, descends: false })
    }
  }
  for (const one of carried) {
    const kind = textAt(one.value, KIND)
    const id = textAt(one.value, ID)
    if (kind === null || id === null || !properties.has(kind)) continue
    for (const said of declaringOf(shadow.reading, id)) {
      const { slug, path } = said
      if (under.has(said.kind)) {
        taking(found, { slug, kind: said.kind, path, descends: true })
      } else if (properties.has(said.kind)) {
        taking(found, { slug, kind: said.kind, path, descends: false })
      }
    }
  }
  return [...found.values()].sort((one, two) =>
    heldAt(one) < heldAt(two) ? -1 : heldAt(one) > heldAt(two) ? 1 : 0
  )
}

function collidingAt(key: string, one: Declared, two: Declared): string {
  return (
    `keys \`${key}\` to \`${identityOf(one)}\` declared by \`${one.declaredBy}\` and to ` +
    `\`${identityOf(two)}\` declared by \`${two.declaredBy}\` — one key names one property, ` +
    `and no narrowing makes two properties one`
  )
}

function looseningAt(key: string, nearer: Declared, further: Declared, how: string): string {
  return (
    `restates \`${identityOf(nearer)}\` at \`${key}\` in \`${nearer.declaredBy}\` over the ` +
    `declaration in \`${further.declaredBy}\`, and ${how} — a restatement narrows`
  )
}

export function looseningIn(nearer: Declared, further: Declared): string | null {
  if (further.required && !nearer.required) return "`required` falls from `true` to `false`"
  if (nearer.many !== further.many) {
    return `\`many\` turns from \`${further.many}\` to \`${nearer.many}\``
  }
  if (further.max !== null && (nearer.max === null || nearer.max > further.max)) {
    return `\`max\` rises from \`${further.max}\` to \`${nearer.max === null ? "none" : nearer.max}\``
  }
  return null
}

function whyRefused(key: string, nearer: Declared, further: Declared): string | null {
  if (identityOf(nearer) !== identityOf(further)) return collidingAt(key, nearer, further)
  const how = looseningIn(nearer, further)
  return how === null ? null : looseningAt(key, nearer, further, how)
}

function declaringIn(one: Held, shadow: Shadow): readonly Declared[] {
  if (one.descends) return declarationsOf(one.slug, shadow.reading, shadow.pageOf)
  const value = shadow.pageOf(one.path)
  return value === null ? [] : carriedIn(value, shadow.reading, one.slug)
}

export function collisionsIn(one: Held, shadow: Shadow): readonly Judged[] {
  const said: Judged[] = []
  for (const [key, held] of Map.groupBy(declaringIn(one, shadow), (each) => each.key)) {
    for (const [at, nearer] of held.entries()) {
      for (const further of held.slice(at + 1)) {
        const why = whyRefused(key, nearer, further)
        if (why !== null) said.push({ path: one.path, reason: why })
      }
    }
  }
  return said
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, pageTypesIn(shadow.reading))
  if (carried.length === 0) return []
  const said: Judged[] = []
  for (const one of judgedIn(carried, change.root, shadow)) {
    said.push(...collisionsIn(one, shadow))
  }
  return said
}

export const keyNamesOneProperty = input(PAGES, refusalsIn)
