import { type Carried as Declared, identityOf } from "@akasha/pages/page-type-properties"
import { textAt } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Carried } from "../relation-resolves/relation-resolves.code-check.code.ts"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const DECLARED = "properties"

const KIND = "type"

const WAS_KIND = "pageTypeSlug"

const SLUG = "slug"

const ID = "id"

const UNIQUE_KINDS: readonly string[] = ["page-property", "page-type", "page"]

const NO_UNIQUE_KIND = "none"

export type Held = {
  readonly slug: string
  readonly kind: string
  readonly path: string
  readonly descends: boolean
}

function heldAt(one: Held): string {
  return `${one.kind}/${one.slug}`
}

function keyFor(one: Held): string {
  return one.descends ? `${PAGE_TYPE}/${one.slug}` : heldAt(one)
}

function sortedIn(found: Map<string, Held>): readonly Held[] {
  return [...found.values()].sort((one, two) =>
    heldAt(one) < heldAt(two) ? -1 : heldAt(one) > heldAt(two) ? 1 : 0
  )
}

function typesBySlug(shadow: Shadow): Map<string, Held> {
  const found = new Map<string, Held>()
  for (const at of shadow.index.everyOfType(PAGE_TYPE)) {
    const value = shadow.pageOf(at.path)
    if (value === null) continue
    const slug = textAt(value, SLUG)
    if (slug === null) continue
    found.set(slug, { slug, kind: PAGE_TYPE, path: at.path, descends: true })
  }
  return found
}

export function underEach(held: readonly Held[], shadow: Shadow): readonly Held[] {
  const found = new Map<string, Held>()
  let types: Map<string, Held> | null = null
  for (const one of held) {
    found.set(keyFor(one), one)
    if (!one.descends) continue
    types ??= typesBySlug(shadow)
    for (const under of shadow.index.kindsUnder(one.slug)) {
      const beneath = types.get(under)
      if (beneath === undefined) continue
      const at = `${PAGE_TYPE}/${under}`
      if (!found.has(at)) found.set(at, beneath)
    }
  }
  return [...found.values()].sort((one, two) =>
    keyFor(one) < keyFor(two) ? -1 : keyFor(one) > keyFor(two) ? 1 : 0
  )
}

function taking(found: Map<string, Held>, one: Held): undefined {
  const at = heldAt(one)
  if (!found.has(at)) found.set(at, one)
}

export function judgedIn(carried: readonly Carried[], shadow: Shadow): readonly Held[] {
  const under = shadow.index.kindsUnder(PAGE_TYPE)
  const properties = shadow.index.kindsUnder(PAGE_PROPERTY)
  const found = new Map<string, Held>()
  for (const one of carried) {
    const kind = textAt(one.value, KIND) ?? textAt(one.value, WAS_KIND)
    const slug = textAt(one.value, SLUG)
    if (kind === null || slug === null) continue
    if (under.has(kind)) taking(found, { slug, kind, path: one.path, descends: true })
    else if (properties.has(kind) && Array.isArray(one.value[DECLARED])) {
      taking(found, { slug, kind, path: one.path, descends: false })
    }
  }
  for (const one of carried) {
    const kind = textAt(one.value, KIND) ?? textAt(one.value, WAS_KIND)
    const id = textAt(one.value, ID)
    if (kind === null || id === null || !properties.has(kind)) continue
    for (const said of shadow.index.declaringOf(id)) {
      const { slug, path } = said
      if (under.has(said.kind)) {
        taking(found, { slug, kind: said.kind, path, descends: true })
      } else if (properties.has(said.kind)) {
        taking(found, { slug, kind: said.kind, path, descends: false })
      }
    }
  }
  return sortedIn(found)
}

export function everyDeclarer(shadow: Shadow): readonly Held[] {
  const under = shadow.index.kindsUnder(PAGE_TYPE)
  const properties = shadow.index.kindsUnder(PAGE_PROPERTY)
  const found = new Map<string, Held>()
  for (const kind of [...under, ...properties]) {
    for (const at of shadow.index.everyOfType(kind)) {
      const value = shadow.pageOf(at.path)
      if (value === null) continue
      const slug = textAt(value, SLUG)
      if (slug === null) continue
      if (under.has(kind)) taking(found, { slug, kind, path: at.path, descends: true })
      else if (Array.isArray(value[DECLARED])) {
        taking(found, { slug, kind, path: at.path, descends: false })
      }
    }
  }
  return sortedIn(found)
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

function uniqueKindIn(one: Declared): string {
  return one.unique ?? NO_UNIQUE_KIND
}

export function widthOf(one: Declared): number {
  const at = one.unique === null ? -1 : UNIQUE_KINDS.indexOf(one.unique)
  return at === -1 ? UNIQUE_KINDS.length : at
}

export function looseningIn(nearer: Declared, further: Declared): string | null {
  if (further.required && !nearer.required) return "`required` falls from `true` to `false`"
  if (nearer.many !== further.many) {
    return `\`many\` turns from \`${further.many}\` to \`${nearer.many}\``
  }
  if (
    further.maxCount !== null &&
    (nearer.maxCount === null || nearer.maxCount > further.maxCount)
  ) {
    const said = nearer.maxCount === null ? "none" : nearer.maxCount
    return `\`max-count\` rises from \`${further.maxCount}\` to \`${said}\``
  }
  if (
    further.maxLength !== null &&
    (nearer.maxLength === null || nearer.maxLength > further.maxLength)
  ) {
    const said = nearer.maxLength === null ? "none" : nearer.maxLength
    return `\`max-length\` rises from \`${further.maxLength}\` to \`${said}\``
  }
  if (widthOf(nearer) > widthOf(further)) {
    return `\`unique\` widens from \`${uniqueKindIn(further)}\` to \`${uniqueKindIn(nearer)}\``
  }
  return null
}

function whyRefused(key: string, nearer: Declared, further: Declared): string | null {
  if (identityOf(nearer) !== identityOf(further)) return collidingAt(key, nearer, further)
  const how = looseningIn(nearer, further)
  return how === null ? null : looseningAt(key, nearer, further, how)
}

function declaringIn(one: Held, shadow: Shadow): readonly Declared[] {
  if (one.descends) return shadow.index.declarationsOf(one.slug)
  const value = shadow.pageOf(one.path)
  return value === null ? [] : shadow.index.carriedIn(value, one.slug)
}

function collisionsIn(one: Held, shadow: Shadow): readonly Judged[] {
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

export function refusalsOver(held: readonly Held[], shadow: Shadow): readonly Judged[] {
  const said: Judged[] = []
  for (const one of held) said.push(...collisionsIn(one, shadow))
  return said
}
