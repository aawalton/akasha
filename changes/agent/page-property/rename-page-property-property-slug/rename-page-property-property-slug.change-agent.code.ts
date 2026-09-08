import { exportedAs, typedAs } from "@akasha/pages/page-export-name"
import { besideAt, partedIn } from "@akasha/pages/page-file-name"
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

const CHANGE_PAGE_PROPERTY = "change-mechanical-file-content/change-page-property"

const RENAME_KEY = "change-mechanical-file-content/rename-page-property-key"

const RENAME_SIGNATURE = "change-mechanical-file-content/rename-property-signature"

const RENAME_PATH = "change-mechanical-file/rename-path"

const PROPERTY_SLUG = "propertySlug"

const ID = "id"

const FILE_PROPERTY = "file-property"

const RECORD_PROPERTY = "record-property"

const PAGE_TYPE = "page-type"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const AT = "at"

const TO = "to"

export type RenamePagePropertyPropertySlugAsked = {
  readonly at: string
  readonly to: string
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
}

type Reading = { readonly was: string; readonly id: string; readonly kind: string }

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
  if (was === given.to) return `\`${given.to}\` is the property slug that page already carries`
  return { was, id, kind: named.pageType }
}

function carryingIn(world: World, types: readonly string[]): readonly string[] {
  const found: string[] = []
  const seen = new Set<string>()
  for (const one of types) {
    for (const kind of world.index.kindsUnder(one)) {
      for (const listed of world.index.everyOfType(kind)) {
        if (seen.has(listed.path)) continue
        seen.add(listed.path)
        found.push(listed.path)
      }
    }
  }
  return found
}

function spelledIn(world: World, paths: readonly string[], one: Spelling): Spelled {
  const carrying: string[] = []
  const moving: Moving[] = []
  for (const path of paths) {
    const held = pageIn(world, path)?.[one.key]
    if (held === undefined) continue
    carrying.push(path)
    if (!one.beside || typeof held !== "string") continue
    const from = besideAt(path, one.was, held)
    const to = besideAt(path, one.to, held)
    if (from === null || to === null || world.textOf(from) === null) continue
    moving.push({ from, to })
  }
  return { carrying, moving }
}

export async function renamePagePropertyPropertySlug(
  world: World,
  given: RenamePagePropertyPropertySlugAsked
): Promise<Answer> {
  const read = readingOf(world, given)
  if (typeof read === "string") return refusing(read)
  const declared = world.index.declaringOf(read.id)
  const inside = declared.find((one) => one.kind === RECORD_PROPERTY)
  if (inside !== undefined) {
    return refusing(
      `\`${inside.slug}\` declares this property as one of its fields, and a key inside a record is not spelled anew here`
    )
  }
  const types = declared.filter((one) => one.kind === PAGE_TYPE)
  const key = exportedAs(read.was)
  const now = exportedAs(given.to)
  const held = spelledIn(
    world,
    carryingIn(
      world,
      types.map((one) => one.slug)
    ),
    {
      key,
      was: read.was,
      to: given.to,
      beside: read.kind === FILE_PROPERTY,
    }
  )
  const answers: Answer[] = []
  let over: World = isLedger(world) ? world : ledgerAt(world.root, world.textOf, world.reaching)
  const reaching = async (address: Reaches, asked: unknown): Promise<string | null> => {
    const said = await reach(over, address, asked)
    if (said.said.refused !== null) return said.said.refused
    over = said.world
    answers.push(said.said)
    return null
  }
  const own = await reaching(CHANGE_PAGE_PROPERTY, {
    at: given.at,
    key: PROPERTY_SLUG,
    to: given.to,
  })
  if (own !== null) return refusing(own)
  for (const path of held.carrying) {
    const why = await reaching(RENAME_KEY, { at: path, was: key, now })
    if (why !== null) return refusing(`\`${path}\` is refused, and ${why}`)
  }
  for (const one of types) {
    const of = `${typedAs(one.slug)}.${key}`
    const why = await reaching(RENAME_SIGNATURE, { at: one.path, of, to: now })
    if (why !== null) return refusing(`\`${one.path}\` is refused, and ${why}`)
  }
  for (const one of held.moving) {
    const why = await reaching(RENAME_PATH, one)
    if (why !== null) return refusing(`\`${one.from}\` is refused, and ${why}`)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await renamePagePropertyPropertySlug(world, { at, to })
}
