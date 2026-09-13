import {
  gathered,
  notText,
  refusing,
  replayed,
  splicedIn,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
  Splice,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { carriedBy } from "akasha/changes/modules/file-carrying/file-carrying.module.code.ts"
import { pageIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  entrySpotted,
  keySpotted,
  type Spotted,
  slugSpotted,
} from "akasha/changes/modules/page-property-renaming/page-property-renaming.module.code.ts"
import {
  type Signing,
  signatureRespelled,
} from "akasha/changes/modules/property-signature-renaming/property-signature-renaming.module.code.ts"
import { holdingIn, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  exportedAs,
  typedAs,
} from "akasha/pages/modules/export-name/page-export-name.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import { partsOf } from "akasha/pages/modules/file-parts/page-file-parts.module.code.ts"

const PROPERTY_SLUG = "propertySlug"

const ID = "id"

const FILE_PROPERTY = "file-property"

const RECORD_PROPERTY = "record-property"

const ENTRY_PROPERTY = "page-property-entry"

const PAGE_TYPE = "page-type"

const TYPES = "types"

const ANY = "*"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const NO_BODY = "holds no body, so no key is spelled anew"

const DECLARED_BY_NONE =
  "is declared by no page type, no record property and no entry shape, so no page carries its key" +
  " — `akasha index refresh` where the index is behind the pages"

function spelledNothing(at: string, key: string, now: string): string {
  return (
    `\`${at}\` reached no page carrying \`${key}\`, so nothing was spelled anew` +
    ` — every page carries \`${now}\` already, or the index is behind the pages`
  )
}

export type Asked = {
  readonly at: string
  readonly to: string
  readonly atMost?: number | null
  readonly was?: string | null
}

type Moving = { readonly from: string; readonly to: string }

type Spelled = {
  readonly carrying: readonly string[]
  readonly moving: readonly Moving[]
}

type Spelling = {
  readonly key: string
  readonly was: string
  readonly to: string
  readonly beside: boolean
  readonly atMost: number | null
}

type Reading = {
  readonly was: string
  readonly id: string
  readonly kind: string
  readonly states: boolean
}

function readingOf(world: World, given: Asked): Reading | string {
  if (!KEBAB.test(given.to)) {
    return `\`${given.to}\` is no property slug, a property slug being lower kebab case`
  }
  const named = partedIn(given.at)
  if (named === null || named.sections.length > 0) {
    return `\`${given.at}\` reads as no page file, so no property is named`
  }
  const value = pageIn(world, given.at)
  if (value === null) return `\`${given.at}\` names no page, so no key is spelled anew`
  const was = value[PROPERTY_SLUG]
  const id = value[ID]
  if (typeof was !== "string" || typeof id !== "string") {
    return `\`${given.at}\` states no \`property-slug\`, so that page carries no key`
  }
  if (was !== given.to) return { was, id, kind: named.pageType, states: false }
  const before = given.was ?? null
  if (before === null) return `\`${given.to}\` is the property slug that page already carries`
  if (before === given.to) {
    return `\`${before}\` is the slug handed in and the slug that page carries, so no key changes`
  }
  return { was: before, id, kind: named.pageType, states: true }
}

function spelledIn(world: World, types: readonly string[], one: Spelling): Spelled {
  const carrying: string[] = []
  const moving: Moving[] = []
  const seen = new Set<string>()
  for (const type of types) {
    for (const kind of world.index.kindsUnder(type)) {
      for (const [path, value] of world.index.valuesByPath(kind)) {
        if (one.atMost !== null && carrying.length >= one.atMost) return { carrying, moving }
        if (seen.has(path)) continue
        seen.add(path)
        const held = value[one.key]
        if (held === undefined) continue
        carrying.push(path)
        if (!one.beside || typeof held !== "string") continue
        const from = besideAt(path, one.was, held)
        const to = besideAt(path, one.to, held)
        if (from === null || to === null || world.bodyOf(from) === null) continue
        moving.push({ from, to })
      }
    }
  }
  return { carrying, moving }
}

type Declared = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

function filedUnder(world: World, shape: Declared): readonly string[] {
  const value = pageIn(world, shape.path)
  const slug = value === null ? null : value[PROPERTY_SLUG]
  if (typeof slug !== "string") return []
  const key = exportedAs(slug)
  const found: string[] = []
  const seen = new Set<string>()
  const holds = holdingIn(world)
  for (const one of world.index.declaringOf(shape.id)) {
    if (one.kind !== PAGE_TYPE) continue
    for (const kind of world.index.kindsUnder(one.slug)) {
      for (const [path, held] of world.index.valuesByPath(kind)) {
        if (seen.has(path)) continue
        seen.add(path)
        const ending = held[key]
        if (typeof ending !== "string") continue
        for (const at of partsOf(path, slug, ending, holds)) {
          if (holds(at)) found.push(at)
        }
      }
    }
  }
  return found
}

function declaringAt(world: World, path: string): string {
  const value = pageIn(world, path)
  const held = value === null ? null : value[TYPES]
  if (typeof held !== "string") return path
  return besideAt(path, TYPES, held) ?? path
}

type Within = {
  readonly key: string
  readonly carrying: readonly string[]
}

function withinOf(world: World, record: Declared, atMost: number | null): Within | null {
  const value = pageIn(world, record.path)
  const slug = value === null ? null : value[PROPERTY_SLUG]
  if (typeof slug !== "string") return null
  const under = world.index
    .declaringOf(record.id)
    .filter((one) => one.kind === PAGE_TYPE)
    .map((one) => one.slug)
  const key = exportedAs(slug)
  const held = spelledIn(world, under, { key, was: slug, to: slug, beside: false, atMost })
  return { key, carrying: held.carrying }
}

type Gathering = {
  readonly texts: Map<string, string>
  readonly spots: Map<string, Splice[]>
}

function gathering(): Gathering {
  return { texts: new Map<string, string>(), spots: new Map<string, Splice[]>() }
}

function textIn(world: World, held: Gathering, path: string): string | null {
  const found = held.texts.get(path)
  if (found !== undefined) return found
  const text = world.textOf(path)
  if (text === null) return null
  held.texts.set(path, text)
  return text
}

function spotted(held: Gathering, path: string, said: Spotted): string | null {
  if ("refused" in said) return said.refused
  const at = held.spots.get(path) ?? []
  at.push(...said.spots)
  held.spots.set(path, at)
  return null
}

function editsOf(held: Gathering): readonly FileChange[] {
  const said: FileChange[] = []
  for (const [path, spots] of held.spots) {
    const text = held.texts.get(path)
    if (text === undefined || spots.length === 0) continue
    said.push(...splicedIn(path, text, spots))
  }
  return said
}

function bodiedOver(world: World, edits: readonly FileChange[]): World | string {
  const said: Answer = { edits, refused: null }
  const held = replayed(said, world.bodyOf)
  if ("refused" in held) return held.refused
  const over = gathered([world.over, said])
  if (over.refused !== null) return over.refused
  return {
    root: world.root,
    index: world.index,
    textOf: (path) => {
      const one = held.has(path) ? (held.get(path) ?? null) : world.textOf(path)
      return notText(one) ? null : one
    },
    bodyOf: (path) => (held.has(path) ? (held.get(path) ?? null) : world.bodyOf(path)),
    under: world.under,
    unentered: world.unentered,
    tracked: world.tracked,
    base: world.base,
    over,
    reaching: world.reaching,
  }
}

function signingsOf(
  world: World,
  types: readonly Declared[],
  records: readonly Declared[],
  key: string,
  to: string
): readonly Signing[] {
  const said: Signing[] = []
  for (const one of types) {
    said.push({ at: declaringAt(world, one.path), of: `${typedAs(one.slug)}.${key}`, to })
  }
  for (const one of records) said.push({ at: one.path, of: `${ANY}.${key}`, to })
  return said
}

export function renamePagePropertyPropertySlug(world: World, given: Asked): Answer {
  const read = readingOf(world, given)
  if (typeof read === "string") return refusing(read)
  const declared = world.index.declaringOf(read.id)
  if (declared.length === 0) return refusing(`\`${given.at}\` ${DECLARED_BY_NONE}`)
  const types = declared.filter((one) => one.kind === PAGE_TYPE)
  const shapes = declared.filter((one) => one.kind === ENTRY_PROPERTY)
  const records = declared.filter((one) => one.kind === RECORD_PROPERTY)
  const key = exportedAs(read.was)
  const now = exportedAs(given.to)
  const atMost = given.atMost ?? null
  const whole = !read.states && atMost === null
  const held = spelledIn(
    world,
    types.map((one) => one.slug),
    { key, was: read.was, to: given.to, beside: read.kind === FILE_PROPERTY, atMost }
  )
  const spelling = gathering()
  if (whole) {
    const text = textIn(world, spelling, given.at)
    if (text === null) return refusing(`\`${given.at}\` ${NO_BODY}`)
    const why = spotted(spelling, given.at, slugSpotted(given.at, text, PROPERTY_SLUG, given.to))
    if (why !== null) return refusing(why)
  }
  for (const path of held.carrying) {
    const text = textIn(world, spelling, path)
    if (text === null) return refusing(`\`${path}\` ${NO_BODY}`)
    const why = spotted(spelling, path, keySpotted(path, text, key, now, null))
    if (why !== null) return refusing(`\`${path}\` is refused, and ${why}`)
  }
  for (const one of records) {
    const within = withinOf(world, one, atMost)
    if (within === null) continue
    for (const path of within.carrying) {
      const text = textIn(world, spelling, path)
      if (text === null) return refusing(`\`${path}\` ${NO_BODY}`)
      const why = spotted(spelling, path, keySpotted(path, text, key, now, within.key))
      if (why !== null) return refusing(`\`${path}\` is refused, and ${why}`)
    }
  }
  for (const at of atMost === null ? shapes.flatMap((one) => filedUnder(world, one)) : []) {
    const text = textIn(world, spelling, at)
    if (text === null) return refusing(`\`${at}\` ${NO_BODY}`)
    const why = spotted(spelling, at, entrySpotted(at, text, key, now))
    if (why !== null) return refusing(`\`${at}\` is refused, and ${why}`)
  }
  const edits: FileChange[] = [...editsOf(spelling)]
  for (const one of whole ? signingsOf(world, types, records, key, now) : []) {
    const over = bodiedOver(world, edits)
    if (typeof over === "string") return refusing(over)
    const said = signatureRespelled(over, one)
    if (said.refused !== null) return refusing(`\`${one.at}\` is refused, and ${said.refused}`)
    edits.push(...said.edits)
  }
  if (held.moving.length > 0) {
    const over = bodiedOver(world, edits)
    if (typeof over === "string") return refusing(over)
    const carried = carriedBy(over, new Map(held.moving.map((one) => [one.from, one.to])))
    if (typeof carried === "string") return refusing(carried)
    edits.push(...carried)
  }
  if (!whole && edits.length === 0) return refusing(spelledNothing(given.at, key, now))
  return stating(edits)
}

export function runChange(world: World, given: Asked): Promise<Answer> {
  return Promise.resolve(renamePagePropertyPropertySlug(world, given))
}
