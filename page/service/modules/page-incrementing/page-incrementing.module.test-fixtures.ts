import {
  idOf,
  indexedRepo,
  pageOf,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

type Held = Record<string, unknown>

const seed = (one: string): string => `01a0a300-0000-7000-8000-0000000000${one}`

export const COUNTER_AT = "akasha/counter/pages/held-counter.counter.ts"

export const BESIDE_AT = "akasha/counter/pages/held-counter.counter.uncommitted.ts"

const TYPES_AT = "akasha/counter/counter.page-type.types.ts"

export function aProperty(one: string, slug: string): [string, string] {
  const value = { id: seed(one), type: "text-property", slug, propertySlug: slug }
  return [`akasha/${slug}.text-property.ts`, pageOf(value)]
}

function counted(pageProperty: string, uncommitted = false): Held {
  const held: Held = { pageProperty, required: false, many: false }
  return uncommitted ? { ...held, uncommitted } : held
}

export function counterRoot(): string {
  return indexedRepo({
    ...Object.fromEntries([
      aProperty("02", "type"),
      aProperty("03", "title"),
      aProperty("04", "presses"),
      aProperty("05", "taps"),
      aProperty("06", "last-tapped-at"),
    ]),
    "akasha/page.page-type.ts": pageOf({
      id: idOf("1"),
      type: "page-type",
      slug: "page",
      extends: [],
      properties: [counted("id"), counted("slug")],
    }),
    "akasha/counter/counter.page-type.ts": pageOf({
      id: seed("10"),
      type: "page-type",
      slug: "counter",
      extends: [`${pageType.slug}/${page.slug}`],
      types: "ts",
      properties: [
        counted("type"),
        counted("title"),
        counted("presses"),
        counted("taps", true),
        counted("last-tapped-at", true),
      ],
    }),
    [TYPES_AT]: "export type Counter = Record<string, unknown>\n",
    [COUNTER_AT]: `import type { Counter } from "akasha/${TYPES_AT}"

export const heldCounter = {
  id: "${seed("20")}",
  type: "page-type/counter",
  slug: "held-counter",
  title: "a counter",
} as const satisfies Counter
`,
  })
}
