import {
  ledgerAt,
  type Reaching,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export const ONE_AT = "thrumming/moots/one.moot-call.ts"

export const TWO_AT = "thrumming/moots/two.moot-call.ts"

const THREE_AT = "thrumming/moots/three.moot-call.ts"

export const TYPE = "moot-call"

export const KEY = "heldBy"

const AINE = `"aine"`

export function mootAt(slug: string): string {
  return `export const ${slug} = {
  type: "page-type/${TYPE}",
  slug: "${slug}",
  weight: 1,
} as const satisfies MootCall
`
}

export type Files = Readonly<Record<string, string>>

export const BODIES: Files = { [ONE_AT]: mootAt("one"), [TWO_AT]: mootAt("two") }

export const DECLARED: Carried = {
  pagePropertySlug: "held-by",
  pageTypeSlug: "relation-property",
  propertySlug: "held-by",
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

export const MANY: Carried = { ...DECLARED, key: "weights", many: true }

function valueAt(slug: string): Value {
  return { type: "page-type/moot-call", slug, weight: 1 }
}

const PLACED: Value = { type: "page-type/moot-call", slug: "three", [KEY]: "alan", weight: 1 }

export const VALUES = new Map<string, Value>([
  [ONE_AT, valueAt("one")],
  [TWO_AT, valueAt("two")],
  [THREE_AT, PLACED],
])

export function worldFor(
  bodies: Files,
  carried: readonly Carried[] | null,
  reaching: Reaching,
  values: ReadonlyMap<string, Value> = VALUES
): World {
  const index = {
    everyOfType: () => Object.keys(bodies).map((path) => ({ path, id: path })),
    propertiesIfNamed: () => carried,
    valuesByPath: () => values,
  } as never
  const ledger = ledgerAt("/nowhere", filesOf(bodies), reaching)
  return Object.defineProperty(ledger, "index", { value: index })
}

export const PUTTING = { pageType: TYPE, key: KEY, value: AINE }
