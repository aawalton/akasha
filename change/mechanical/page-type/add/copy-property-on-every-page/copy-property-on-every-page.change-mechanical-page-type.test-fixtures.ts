import type { Reaching, World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOfType } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export const ONE_AT = "thrumming/moots/pages/one.moot-call.ts"

export const TWO_AT = "thrumming/moots/pages/two.moot-call.ts"

export const TYPE = "moot-call"

export const FROM = "calledBySlugs"

export const TO = "calledBy"

function callAt(slug: string, held: string): string {
  return `import type { MootCall } from "../moot-call.page-type.ts"

export const ${slug} = {
  type: "page-type/${TYPE}",
  slug: "${slug}",
  ${FROM}: ["${held}"],
  weight: 1,
} as const satisfies MootCall
`
}

export type Files = Readonly<Record<string, string>>

export const BODIES: Files = { [ONE_AT]: callAt("one", "aine"), [TWO_AT]: callAt("two", "alan") }

export const HOLDS_MANY: Carried = {
  pagePropertySlug: "called-by-slugs",
  pageTypeSlug: "relation-property",
  propertySlug: "called-by-slugs",
  key: FROM,
  unique: null,
  declaredBy: TYPE,
  required: false,
  many: true,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

export const HOLDS_ONE: Carried = {
  ...HOLDS_MANY,
  pagePropertySlug: "called-by",
  propertySlug: "called-by",
  key: TO,
  many: false,
}

export const DECLARED: readonly Carried[] = [HOLDS_MANY, HOLDS_ONE]

export const VALUES = new Map<string, Value>([
  [ONE_AT, { type: "page-type/moot-call", slug: "one", [FROM]: ["aine"] }],
  [TWO_AT, { type: "page-type/moot-call", slug: "two", [FROM]: ["alan"] }],
])

export function worldFor(
  bodies: Files,
  carried: readonly Carried[] | null,
  reaching: Reaching,
  values: ReadonlyMap<string, Value> = VALUES
): World {
  return worldOfType(TYPE, bodies, carried, values, reaching)
}

export const CARRYING = { pageType: TYPE, from: FROM, to: TO }
