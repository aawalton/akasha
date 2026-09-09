import { exportedAs, typedAs } from "@akasha/pages/page-export-name"
import { besideAt, partedIn } from "@akasha/pages/page-file-name"
import { partsOf } from "@akasha/pages/page-file-parts"
import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  type Reaches,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const CHANGE_PAGE_PROPERTY = "change-mechanical-file-content/change-page-page-property"

const RENAME_KEY = "change-mechanical-file-content/rename-page-property-key"

const RENAME_SIGNATURE = "change-mechanical-file-content/rename-property-signature"

const RENAME_ENTRY_KEY = "change-mechanical-file-content/rename-entry-key"

const MOVE_FILE_CODE = "change-mechanical/move-file-code"

const PROPERTY_SLUG = "propertySlug"

const ID = "id"

const FILE_PROPERTY = "file-property"

const RECORD_PROPERTY = "record-property"

const ENTRY_PROPERTY = "page-property-entry"

const PAGE_TYPE = "page-type"

const ANY = "*"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const AT = "at"

const TO = "to"

const MOST = "most"

const WAS = "was"

const DECLARED_BY_NONE =
  "is declared by no page type, no record property and no entry shape, so no page carries its key" +
  " — `akasha index refresh` where the index is behind the pages"

function spelledNothing(at: string, key: string, now: string): string {
  return (
    `\`${at}\` reached no page carrying \`${key}\`, so nothing was spelled anew` +
    ` — every page carries \`${now}\` already, or the index is behind the pages`
  )
}

export type RenamePagePropertyPropertySlugAsked = {
  readonly at: string
  readonly to: string
  readonly most?: number | null
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
  readonly most: number | null
}

type Reading = {
  readonly was: string
  readonly id: string
  readonly kind: string
  readonly states: boolean
}

function readingOf(world: World, given: RenamePagePropertyPropertySlugAsked): Reading | string {
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
        if (one.most !== null && carrying.length >= one.most) return { carrying, moving }
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
  const holds = (at: string): boolean => world.textOf(at) !== null
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

type Within = {
  readonly key: string
  readonly carrying: readonly string[]
}

function withinOf(world: World, record: Declared, most: number | null): Within | null {
  const value = pageIn(world, record.path)
  const slug = value === null ? null : value[PROPERTY_SLUG]
  if (typeof slug !== "string") return null
  const under = world.index
    .declaringOf(record.id)
    .filter((one) => one.kind === PAGE_TYPE)
    .map((one) => one.slug)
  const key = exportedAs(slug)
  const held = spelledIn(world, under, { key, was: slug, to: slug, beside: false, most })
  return { key, carrying: held.carrying }
}

export async function renamePagePropertyPropertySlug(
  world: World,
  given: RenamePagePropertyPropertySlugAsked
): Promise<Answer> {
  const read = readingOf(world, given)
  if (typeof read === "string") return refusing(read)
  const declared = world.index.declaringOf(read.id)
  if (declared.length === 0) return refusing(`\`${given.at}\` ${DECLARED_BY_NONE}`)
  const types = declared.filter((one) => one.kind === PAGE_TYPE)
  const shapes = declared.filter((one) => one.kind === ENTRY_PROPERTY)
  const records = declared.filter((one) => one.kind === RECORD_PROPERTY)
  const key = exportedAs(read.was)
  const now = exportedAs(given.to)
  const most = given.most ?? null
  const whole = !read.states && most === null
  const entries = most === null ? shapes.flatMap((one) => filedUnder(world, one)) : []
  const held = spelledIn(
    world,
    types.map((one) => one.slug),
    {
      key,
      was: read.was,
      to: given.to,
      beside: read.kind === FILE_PROPERTY,
      most,
    }
  )
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  const reaching = async (address: Reaches, asked: unknown): Promise<string | null> => {
    const said = await reach(over, address, asked)
    if (said.said.refused !== null) return said.said.refused
    over = said.world
    answers.push(said.said)
    return null
  }
  if (whole) {
    const own = await reaching(CHANGE_PAGE_PROPERTY, {
      at: given.at,
      key: PROPERTY_SLUG,
      to: given.to,
    })
    if (own !== null) return refusing(own)
  }
  for (const path of held.carrying) {
    const why = await reaching(RENAME_KEY, { at: path, was: key, now })
    if (why !== null) return refusing(`\`${path}\` is refused, and ${why}`)
  }
  for (const one of records) {
    const within = withinOf(world, one, most)
    if (within === null) continue
    for (const path of within.carrying) {
      const why = await reaching(RENAME_KEY, { at: path, was: key, now, within: within.key })
      if (why !== null) return refusing(`\`${path}\` is refused, and ${why}`)
    }
  }
  for (const one of whole ? types : []) {
    const of = `${typedAs(one.slug)}.${key}`
    const why = await reaching(RENAME_SIGNATURE, { at: one.path, of, to: now })
    if (why !== null) return refusing(`\`${one.path}\` is refused, and ${why}`)
  }
  for (const one of whole ? records : []) {
    const why = await reaching(RENAME_SIGNATURE, { at: one.path, of: `${ANY}.${key}`, to: now })
    if (why !== null) return refusing(`\`${one.path}\` is refused, and ${why}`)
  }
  for (const at of entries) {
    const why = await reaching(RENAME_ENTRY_KEY, { at, was: key, now })
    if (why !== null) return refusing(`\`${at}\` is refused, and ${why}`)
  }
  for (const one of held.moving) {
    const why = await reaching(MOVE_FILE_CODE, one)
    if (why !== null) return refusing(`\`${one.from}\` is refused, and ${why}`)
  }
  if (!whole && answers.length === 0) return refusing(spelledNothing(given.at, key, now))
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export function mostIn(said: string | undefined): number | null | string {
  if (said === undefined) return null
  const held = Number(said)
  if (!Number.isInteger(held) || held < 1) {
    return `\`${said}\` is no count of pages, a count being a whole number above nothing`
  }
  return held
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const most = mostIn(given[MOST])
  if (typeof most === "string") return refusing(most)
  return await renamePagePropertyPropertySlug(world, { at, to, most, was: given[WAS] ?? null })
}
