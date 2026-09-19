import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { literalIn, textsOf } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  editsOver,
  type Page,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { spelledAs } from "akasha/change/modules/value-spelling/value-spelling.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { partedIn, typeSlugIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const PAGE_PROPERTY = "page-property"

const PROPERTY_SLUG = "propertySlug"

const PROPERTIES = "properties"

const PARTS = "parts"

const BOOLEAN_PROPERTY = "boolean-property"

const NUMBER_PROPERTY = "number-property"

const BOOLEAN = "boolean"

const NUMBER = "number"

const NO_COUNT = ", maxCount: null"

const MANY_HOLDS = "holds many values, and a declaration holding many states no default"

const NO_PART = "names no page, so nothing names the property among its parts"

const NO_TYPE = "names no page type, so nothing declares the property there"

export type Asked = {
  readonly at: string
  readonly body: string
  readonly partOf: string
  readonly on: readonly string[]
  readonly required: boolean
  readonly many: boolean
  readonly default?: string
}

type Made = {
  readonly property: string
  readonly key: string
  readonly holds: string | undefined
}

type Spelled = { readonly said: string | null; readonly held: string | null }

type Writing = Map<string, Written[]>

function holdingOf(world: World, pageTypeSlug: string): string | undefined {
  if (world.index.kindsUnder(BOOLEAN_PROPERTY).has(pageTypeSlug)) return BOOLEAN
  if (world.index.kindsUnder(NUMBER_PROPERTY).has(pageTypeSlug)) return NUMBER
  return undefined
}

function madeIn(world: World, given: Asked): Made | string {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return `\`${given.at}\` names no page, so no page property is written there`
  }
  if (!world.index.kindsUnder(PAGE_PROPERTY).has(said.pageType)) {
    return `\`${said.pageType}\` names no page type a page property is`
  }
  if (world.textOf(given.at) !== null) {
    return `\`${given.at}\` holds a body already, so no page property is written there`
  }
  const owner = literalIn(parsedAs(given.at, given.body))
  if (owner === null) return `the body handed in for \`${given.at}\` exports no object`
  const slug = textsOf(owner).get(PROPERTY_SLUG)
  if (slug === undefined) {
    return `the body handed in for \`${given.at}\` states no \`${PROPERTY_SLUG}\``
  }
  return {
    property: `${said.pageType}/${said.slug}`,
    key: exportedAs(slug.text),
    holds: holdingOf(world, said.pageType),
  }
}

function defaultOf(given: Asked, made: Made): Spelled | string {
  const said = given.default
  if (said === undefined) return { said: null, held: null }
  const held = spelledAs(said, made.holds)
  if (held === null) {
    return `\`${said}\` is no ${made.holds}, so \`${made.property}\` holds it nowhere`
  }
  return { said: JSON.stringify(said), held }
}

function declaringOf(given: Asked, made: Made, said: string | null): string {
  const beside = given.many ? NO_COUNT : said === null ? "" : `, default: ${said}`
  const property = JSON.stringify(made.property)
  return `{ pageProperty: ${property}, required: ${given.required}, many: ${given.many}${beside} }`
}

function writtenAt(held: Writing, path: string, one: Written): undefined {
  const found = held.get(path) ?? []
  found.push(one)
  held.set(path, found)
}

function pagesUnder(world: World, slugs: readonly string[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const slug of slugs) {
    for (const kind of world.index.kindsUnder(slug)) {
      for (const path of world.index.valuesByPath(kind).keys()) found.add(path)
    }
  }
  return found
}

function slugsIn(world: World, given: Asked): readonly string[] | string {
  const found: string[] = []
  for (const one of given.on) {
    const slug = typeSlugIn(one)
    if (slug === null || pageIn(world, one) === null) return `\`${one}\` ${NO_TYPE}`
    found.push(slug)
  }
  return found
}

function writingIn(world: World, given: Asked, made: Made, spelled: Spelled): Writing | string {
  if (pageIn(world, given.partOf) === null) return `\`${given.partOf}\` ${NO_PART}`
  const slugs = slugsIn(world, given)
  if (typeof slugs === "string") return slugs
  const held: Writing = new Map()
  writtenAt(held, given.partOf, {
    written: "listed",
    key: PARTS,
    value: JSON.stringify(made.property),
  })
  const record = declaringOf(given, made, spelled.said)
  for (const one of given.on) {
    writtenAt(held, one, { written: "recorded", key: PROPERTIES, record })
  }
  const value = spelled.held
  if (value === null) return held
  for (const path of pagesUnder(world, slugs)) {
    writtenAt(held, path, { written: "put", key: made.key, value })
  }
  return held
}

export function addPageProperty(world: World, given: Asked): Said {
  const made = madeIn(world, given)
  if (typeof made === "string") return refusing(made)
  if (given.many && given.default !== undefined) {
    return refusing(`\`${made.property}\` ${MANY_HOLDS}`)
  }
  if (given.on.length === 0) {
    return refusing(`no page type declares \`${made.property}\`, so no page would carry it`)
  }
  const spelled = defaultOf(given, made)
  if (typeof spelled === "string") return refusing(spelled)
  const writing = writingIn(world, given, made, spelled)
  if (typeof writing === "string") return refusing(writing)
  const pages: readonly Page[] = [...writing].map(([path, written]) => ({ path, written }))
  const edits = editsOver(world, pages)
  if (typeof edits === "string") return refusing(edits)
  return stating([{ kind: "add", path: given.at, content: given.body }, ...edits])
}

export function runChange(world: World, given: Asked): Said {
  return addPageProperty(world, given)
}
