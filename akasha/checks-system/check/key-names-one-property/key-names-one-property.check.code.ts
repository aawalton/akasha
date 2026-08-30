import {
  pageTypesIn,
  textAt,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  idsNaming,
  standingById,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { kindsUnder } from "../../../pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"
import {
  type Carried as Declared,
  declarationsOf,
  identityOf,
} from "../../../pages-system/page-type/page-type-properties/page-type-properties.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import type { Change, Judged } from "../../judging/judging.module.code.ts"
import { type Carried, carriedBy } from "../relation-resolves/relation-resolves.check.code.ts"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const DECLARES = "page-property-slug"

const KIND = "pageTypeSlug"

const SLUG = "slug"

const ID = "id"

export type Held = {
  readonly pageTypeSlug: string
  readonly path: string
}

export function judgedIn(
  carried: readonly Carried[],
  root: string,
  shadow: Shadow
): readonly Held[] {
  const under = kindsUnder(root, PAGE_TYPE, shadow.reading, shadow.pageOf)
  const properties = kindsUnder(root, PAGE_PROPERTY, shadow.reading, shadow.pageOf)
  const found = new Map<string, string>()
  for (const one of carried) {
    const kind = textAt(one.value, KIND)
    const slug = textAt(one.value, SLUG)
    if (kind === null || slug === null || !under.has(kind)) continue
    found.set(slug, one.path)
  }
  for (const one of carried) {
    const kind = textAt(one.value, KIND)
    const id = textAt(one.value, ID)
    if (kind === null || id === null || !properties.has(kind)) continue
    for (const said of idsNaming(shadow.reading, id, DECLARES)) {
      const standing = standingById(shadow.reading, said)
      const value = standing === null ? null : shadow.pageOf(standing.path)
      if (standing === null || value === null) continue
      const above = textAt(value, KIND)
      const slug = textAt(value, SLUG)
      if (above === null || slug === null || !under.has(above)) continue
      if (!found.has(slug)) found.set(slug, standing.path)
    }
  }
  return [...found]
    .map(([pageTypeSlug, path]) => ({ pageTypeSlug, path }))
    .sort((one, two) =>
      one.pageTypeSlug < two.pageTypeSlug ? -1 : one.pageTypeSlug > two.pageTypeSlug ? 1 : 0
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

function looseningIn(nearer: Declared, further: Declared): string | null {
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

export function collisionsIn(one: Held, shadow: Shadow): readonly Judged[] {
  const said: Judged[] = []
  for (const [key, held] of Map.groupBy(
    declarationsOf(one.pageTypeSlug, shadow.reading, shadow.pageOf),
    (each) => each.key
  )) {
    for (const [at, nearer] of held.entries()) {
      for (const further of held.slice(at + 1)) {
        const why = whyRefused(key, nearer, further)
        if (why !== null) said.push({ path: one.path, reason: why })
      }
    }
  }
  return said
}

export function keyNamesOneProperty(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, pageTypesIn(shadow.reading))
  if (carried.length === 0) return []
  const said: Judged[] = []
  for (const one of judgedIn(carried, change.root, shadow)) {
    said.push(...collisionsIn(one, shadow))
  }
  return said
}
