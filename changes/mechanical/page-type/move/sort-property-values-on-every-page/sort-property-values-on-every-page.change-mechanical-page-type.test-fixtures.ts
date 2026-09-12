import type { Reaching, World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { worldOfType } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import type { Carried as Declared } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const SORTING = "change-mechanical-page-type/sort-property-values-on-every-page"

export const ONE_AT = "alan/books/one.book-section.ts"

export const TWO_AT = "alan/books/two.book-section.ts"

export const KEY = "partOfSlugs"

export const TYPE = "book-section"

export function sectionAt(slug: string, held: readonly string[]): string {
  const values = held.map((one) => JSON.stringify(one)).join(", ")
  return `export const ${slug} = {
  pageTypeSlug: "book-section",
  slug: "${slug}",
  ${KEY}: [${values}],
} as const satisfies BookSection
`
}

export const SPELLED = `export const one = {
  pageTypeSlug: "book-section",
  slug: "one",
  ${KEY}: ["beta", "al\\u0070ha"],
} as const satisfies BookSection
`

export const DECLARED: Declared = {
  pagePropertySlug: "part-of-slugs",
  pageTypeSlug: "relation-property",
  propertySlug: "part-of-slugs",
  key: KEY,
  unique: null,
  declaredBy: TYPE,
  required: false,
  many: true,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

export type Files = Readonly<Record<string, string>>

export function valued(
  held: Readonly<Record<string, readonly string[]>>
): ReadonlyMap<string, Value> {
  const found = new Map<string, Value>()
  for (const [path, one] of Object.entries(held)) found.set(path, { [KEY]: [...one] })
  return found
}

export function worldFor(
  bodies: Files,
  values: ReadonlyMap<string, Value>,
  reaching: Reaching,
  carried: readonly Declared[] | null = [DECLARED]
): World {
  return worldOfType(TYPE, bodies, carried, values, reaching)
}

export const OUT_OF_ORDER = ["beta", "alpha"]

export const MANY = ["delta", "alpha", "charlie", "bravo"]

export const BODIES: Files = {
  [ONE_AT]: sectionAt("one", OUT_OF_ORDER),
  [TWO_AT]: sectionAt("two", OUT_OF_ORDER),
}

export const VALUES = valued({ [ONE_AT]: OUT_OF_ORDER, [TWO_AT]: OUT_OF_ORDER })

export const NOTHING_ORDERED = "no `book-section` holds `partOfSlugs` out of the order it sorts in"
