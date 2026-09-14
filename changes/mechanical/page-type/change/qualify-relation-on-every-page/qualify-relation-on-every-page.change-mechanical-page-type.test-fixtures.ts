import {
  ledgerAt,
  type Reaching,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  filesOf,
  knownOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import { isInPage } from "akasha/pages/address-kinds/in-page/in-page.page-address-kind.code.ts"
import { isInPageProperty } from "akasha/pages/address-kinds/in-page-property/in-page-property.page-address-kind.code.ts"
import type { Listed } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import type { PageAddress } from "akasha/pages/modules/address/page-address.module.code.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/pages/types/modules/declared-properties/declared-properties.module.code.ts"

const NOWHERE = "/nowhere"

export const QUALIFYING = "change-mechanical-page-type/qualify-relation-on-every-page"

export const TYPE = "book-section"

const TARGET = "collection"

export const ONE_KEY = "sectionOf"

export const LIST_KEY = "partOfCollections"

export const TEXT_KEY = "definition"

export const ONE_AT = "alan/books/one.book-section.ts"

export const TWO_AT = "alan/books/two.book-section.ts"

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

const TARGETED: ReadonlySet<string> = new Set(["book-section-of", "book-part-of-collections"])

function listedOf(one: Reached): Listed {
  return { path: `alan/collections/${one.slug}.${one.pageTypeSlug}.ts`, id: one.id }
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

export const DECLARED: readonly Declared[] = [
  declaring(ONE_KEY, "book-section-of", "section-of", false),
  declaring(LIST_KEY, "book-part-of-collections", "part-of-collections", true),
  declaring(TEXT_KEY, "definition", "definition", false),
]

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
