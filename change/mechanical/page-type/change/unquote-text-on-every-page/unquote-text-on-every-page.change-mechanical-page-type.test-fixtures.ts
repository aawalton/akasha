import type { Reaching, World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOfType } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export const ONE_AT = "alan/book/one.book-section.ts"

export const TWO_AT = "alan/book/two.book-section.ts"

export const KEY = "description"

export const TYPE = "book-section"

export function sectionAt(slug: string, held: string): string {
  return `export const ${slug} = {
  type: "page-type/book-section",
  slug: "${slug}",
  ${KEY}: ${JSON.stringify(held)},
} as const satisfies BookSection
`
}

const DECLARED: Declared = {
  pagePropertySlug: "description",
  pageTypeSlug: "text-property",
  propertySlug: "description",
  key: KEY,
  unique: null,
  declaredBy: TYPE,
  required: false,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

type Files = Readonly<Record<string, string>>

export function valued(held: Readonly<Record<string, string>>): ReadonlyMap<string, Value> {
  const found = new Map<string, Value>()
  for (const [path, one] of Object.entries(held)) found.set(path, { [KEY]: one })
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

const QUOTED = '"Deal damage.\\nSay \\"now\\"."'

export const PLAIN = "Deal damage."

export const BODIES: Files = {
  [ONE_AT]: sectionAt("one", QUOTED),
  [TWO_AT]: sectionAt("two", PLAIN),
}

export const VALUES = valued({ [ONE_AT]: QUOTED, [TWO_AT]: PLAIN })

export const NOTHING_QUOTED = "no `book-section` holds quoted text under `description`"
