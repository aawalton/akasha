import { ledgerAt, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export const TYPE = "week"

export const ONE_AT = "alan/weeks/one.week.ts"

export const TWO_AT = "alan/weeks/two.week.ts"

export const ONE_ROWS_AT = "alan/weeks/one.week.spans.jsonl"

export const TWO_ROWS_AT = "alan/weeks/two.week.spans.jsonl"

export const PART_TWO_AT = "alan/weeks/one.week.spans.part2.jsonl"

const ENTRY: Declared = {
  pagePropertySlug: "page-property-entry/week-spans",
  pageTypeSlug: "page-property-entry",
  propertySlug: "spans",
  key: "spans",
  unique: null,
  declaredBy: TYPE,
  required: false,
  many: true,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

const WEEKS: ReadonlyMap<string, Value> = new Map([
  [ONE_AT, { spans: "jsonl" }],
  [TWO_AT, { spans: "jsonl" }],
])

function bodyOf(slug: string): string {
  return `export const ${slug} = {\n  slug: "${slug}",\n  spans: "jsonl",\n}\n`
}

export function weeksWith(files: Readonly<Record<string, string>>): World {
  const index = {
    kindsUnder: (of: string) => new Set([of]),
    propertiesIfNamed: (of: string) => (of === TYPE ? [ENTRY] : null),
    valuesByPath: () => WEEKS,
  } as never
  const bodies = { [ONE_AT]: bodyOf("one"), [TWO_AT]: bodyOf("two"), ...files }
  const ledger = ledgerAt("/nowhere", filesOf(bodies))
  return Object.defineProperty(ledger, "index", { value: index })
}
