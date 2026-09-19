import { qualifyRelationOnEveryPage } from "akasha/change/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import {
  ledgerAt,
  type Reaching,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  filesOf,
  knownOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { isInPage } from "akasha/page/address-kind/in-page/in-page.page-address-kind.code.ts"
import { isInPageProperty } from "akasha/page/address-kind/in-page-property/in-page-property.page-address-kind.code.ts"
import type { Listed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { PageAddress } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const NOWHERE = "/nowhere"

export const QUALIFYING =
  `${changeMechanicalPageType.slug}/${qualifyRelationOnEveryPage.slug}` as const

export const TYPE = "book-section"

const TARGET = "collection"

export const ONE_KEY = "sectionOf"

export const LIST_KEY = "partOfCollections"

export const TEXT_KEY = "definition"

export const RECORD_KEY = "holds"

export const FIELD_KEY = "collection"

const RECORD_SLUG = "book-holds"

const FIELD_SLUG = "book-held-collection"

export const HOLDING_AT = "alan/book/holding.book-section.ts"

export const ONE_AT = "alan/book/one.book-section.ts"

export const TWO_AT = "alan/book/two.book-section.ts"

const ENTRY_KEY = "conditions"

export const ROW_FIELD = "collection"

const ENTRY_SLUG = "book-conditions"

const ROW_FIELD_SLUG = "book-row-collection"

const ENTRY_AT = "alan/book/rows.book-section.ts"

export const ROWS_AT = "alan/book/rows.book-section.conditions.jsonl"

export const PART_TWO_AT = "alan/book/rows.book-section.conditions.part2.jsonl"

export const UNCOMMITTED_AT = "alan/book/rows.book-section.conditions.uncommitted.jsonl"

const MORE_AT = "alan/book/more.book-section.ts"

export const MORE_ROWS_AT = "alan/book/more.book-section.conditions.jsonl"

export type Reached = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly id: string
}

const SCRIPTURES: Reached = {
  pageTypeSlug: "scripture-collection",
  slug: "scriptures",
  id: "01a09e00-0000-7000-8000-000000000001",
}

export const SONGS: Reached = {
  pageTypeSlug: "collection",
  slug: "songs",
  id: "01a09e00-0000-7000-8000-000000000002",
}

export const TWICE: Reached = {
  pageTypeSlug: "collection",
  slug: "scriptures",
  id: "01a09e00-0000-7000-8000-000000000003",
}

export const PAGES: readonly Reached[] = [SCRIPTURES, SONGS]

const ADMITTING: readonly string[] = [TARGET, "scripture-collection"]

const TARGETED: ReadonlySet<string> = new Set([
  "book-section-of",
  "book-part-of-collections",
  FIELD_SLUG,
  ROW_FIELD_SLUG,
])

function listedOf(one: Reached): Listed {
  return { path: `alan/collection/${one.slug}.${one.pageTypeSlug}.ts`, id: one.id }
}

function filedIn(pages: readonly Reached[]): (address: PageAddress) => readonly Listed[] {
  return (address) => {
    if (isInPage(address)) {
      return pages.filter((each) => each.id === address.id).map(listedOf)
    }
    if (isInPageProperty(address)) return []
    return pages
      .filter((each) => each.pageTypeSlug === address.pageTypeSlug && each.slug === address.value)
      .map(listedOf)
  }
}

function declaring(key: string, slug: string, propertySlug: string, many: boolean): Declared {
  const pageTypeSlug = TARGETED.has(slug) ? "relation-property" : "text-property"
  return {
    pagePropertySlug: `${pageTypeSlug}/${slug}`,
    pageTypeSlug,
    propertySlug,
    key,
    unique: null,
    declaredBy: TYPE,
    required: false,
    many,
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
  }
}

function declaringRecord(): Declared {
  return {
    pagePropertySlug: `record-property/${RECORD_SLUG}`,
    pageTypeSlug: "record-property",
    propertySlug: "holds",
    key: RECORD_KEY,
    unique: null,
    declaredBy: TYPE,
    required: false,
    many: true,
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
  }
}

function declaringEntry(uncommitted: boolean): Declared {
  return {
    pagePropertySlug: `page-property-entry/${ENTRY_SLUG}`,
    pageTypeSlug: "page-property-entry",
    propertySlug: ENTRY_KEY,
    key: ENTRY_KEY,
    unique: null,
    declaredBy: TYPE,
    required: false,
    many: true,
    maxCount: null,
    maxLength: null,
    uncommitted,
    secret: false,
  }
}

export const DECLARED: readonly Declared[] = [
  declaring(ONE_KEY, "book-section-of", "section-of", false),
  declaring(LIST_KEY, "book-part-of-collections", "part-of-collections", true),
  declaring(TEXT_KEY, "definition", "definition", false),
  declaringRecord(),
  declaringEntry(false),
]

export const BESIDE_UNCOMMITTED: readonly Declared[] = [declaringEntry(true)]

export function sectionAt(slug: string, one: string, held: readonly string[]): string {
  const values = held.map((each) => JSON.stringify(each)).join(", ")
  return `export const ${slug} = {
  pageTypeSlug: "book-section",
  slug: "${slug}",
  ${ONE_KEY}: ${JSON.stringify(one)},
  ${LIST_KEY}: [${values}],
} as const satisfies BookSection
`
}

export function valued(held: Readonly<Record<string, Value>>): ReadonlyMap<string, Value> {
  return new Map(Object.entries(held))
}

export function pageOf(one: string, held: readonly string[]): Value {
  return { [ONE_KEY]: one, [LIST_KEY]: [...held] }
}

export type Files = Readonly<Record<string, string>>

export const BODIES: Files = {
  [ONE_AT]: sectionAt("one", "scriptures", ["scriptures", "collection/songs"]),
  [TWO_AT]: sectionAt("two", "collection/songs", ["songs"]),
}

export const VALUES = valued({
  [ONE_AT]: pageOf("scriptures", ["scriptures", "collection/songs"]),
  [TWO_AT]: pageOf("collection/songs", ["songs"]),
})

export function holdingAt(slug: string, held: readonly string[]): string {
  const entries = held.map((each) => `    { ${FIELD_KEY}: ${JSON.stringify(each)} },`).join("\n")
  return `export const ${slug} = {
  pageTypeSlug: "book-section",
  slug: "${slug}",
  ${RECORD_KEY}: [
${entries}
  ],
} as const satisfies BookSection
`
}

export function holdingOf(held: readonly string[]): Value {
  return { [RECORD_KEY]: held.map((each) => ({ [FIELD_KEY]: each })) }
}

export const HOLDING_BODIES: Files = {
  [HOLDING_AT]: holdingAt("holding", ["scriptures", "collection/songs"]),
}

export const HOLDING_VALUES = valued({
  [HOLDING_AT]: holdingOf(["scriptures", "collection/songs"]),
})

export function worldFor(
  bodies: Files,
  values: ReadonlyMap<string, Value>,
  pages: readonly Reached[] = PAGES,
  carried: readonly Declared[] | null = DECLARED,
  reaching?: Reaching
): World {
  const known = knownOf({
    targetOf: (propertySlug) => (TARGETED.has(propertySlug) ? TARGET : null),
    admitting: (one) => (one === TARGET ? ADMITTING : []),
    filed: filedIn(pages),
    fieldOfKey: (propertySlug, key) =>
      propertySlug === RECORD_SLUG && key === FIELD_KEY ? FIELD_SLUG : null,
    rowFieldOfKey: (slug, key) =>
      slug === ENTRY_SLUG && key === ROW_FIELD ? ROW_FIELD_SLUG : null,
  })
  const index = {
    kindsUnder: () => new Set([TYPE]),
    pageTypesIn: () => new Set([TYPE]),
    propertiesIfNamed: () => carried,
    valuesByPath: () => values,
    knownIn: () => known,
  } as never
  const ledger = ledgerAt(NOWHERE, filesOf(bodies), reaching)
  return Object.defineProperty(ledger, "index", { value: index })
}

export const NOTHING_BARE =
  "no `book-section` names a page by a bare name under `partOfCollections`"

function entriedAt(slug: string): string {
  return `export const ${slug} = {
  pageTypeSlug: "book-section",
  slug: "${slug}",
  ${ENTRY_KEY}: "jsonl",
} as const satisfies BookSection
`
}

export function rowsOf(rows: readonly Value[]): string {
  return `${rows.map((one) => JSON.stringify(one)).join("\n")}\n`
}

const ENTRY_PAGES: Files = {
  [ENTRY_AT]: entriedAt("rows"),
  [MORE_AT]: entriedAt("more"),
}

export const ENTRY_VALUES = valued({ [ENTRY_AT]: { [ENTRY_KEY]: "jsonl" } })

export const TWO_ENTRY_VALUES = valued({
  [ENTRY_AT]: { [ENTRY_KEY]: "jsonl" },
  [MORE_AT]: { [ENTRY_KEY]: "jsonl" },
})

export const BESIDE_ASKED = { pageType: TYPE, key: ENTRY_KEY, field: ROW_FIELD }

export function besideWorld(
  files: Files,
  values: ReadonlyMap<string, Value> = ENTRY_VALUES,
  pages: readonly Reached[] = PAGES,
  carried: readonly Declared[] = DECLARED
): World {
  return worldFor({ ...ENTRY_PAGES, ...files }, values, pages, carried)
}
