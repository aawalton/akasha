import {
  ledgerAt,
  type Reaching,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { DepToken } from "akasha/domain/plain-language/modules/dependency-graph/dependency-graph.module.code.ts"
import { makeSentence } from "akasha/domain/plain-language/modules/dependency-graph/dependency-graph.module.code.ts"
import type { Parsing } from "akasha/domain/standard-agent-english/modules/prose-restating/prose-restating.module.code.ts"
import type { Pattern } from "akasha/domain/standard-agent-english/modules/prose-rewrite/prose-rewrite.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  carriedFrom,
  sourceOver,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const NOWHERE = "/nowhere"

const PROSE = "standard-agent-english-property"

const RECORD = "record-property"

const WIDGET = "widget"

const HOLDS = "holds"

export const ONE_AT = "akasha/widgets/one.widget.ts"

export const TWO_AT = "akasha/widgets/two.widget.ts"

export const SPELLINGS: readonly string[] = ["hold", "holds"]

export const PATTERNS: readonly Pattern[] = [
  { frame: "object", fromPattern: "holds [object]", toPattern: "has [object]" },
]

const SAYING: Value = { type: PROSE, slug: "saying", propertySlug: "saying" }

const STATEMENT: Value = { type: PROSE, slug: "statement", propertySlug: "statement" }

const NOTES: Value = {
  type: RECORD,
  slug: "notes",
  propertySlug: "notes",
  properties: [{ pageProperty: `${PROSE}/statement` }],
}

const WIDGET_TYPE: Value = {
  type: "page-type",
  slug: WIDGET,
  properties: [{ pageProperty: `${PROSE}/saying` }, { pageProperty: `${RECORD}/notes` }],
}

const VOCABULARY: readonly Value[] = [WIDGET_TYPE, SAYING, STATEMENT, NOTES]

const PAGES: ReadonlyMap<string, Value> = new Map([
  [`${PROSE}/saying`, SAYING],
  [`${PROSE}/statement`, STATEMENT],
  [`${RECORD}/notes`, NOTES],
  [`page-type/${WIDGET}`, WIDGET_TYPE],
])

const ONE_BODY = `export const one = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "widget",
  slug: "one",
  saying: "a page holds a value",
  notes: [
    {
      statement: "a page holds one",
    },
  ],
} as const
`

const TWO_BODY = `export const two = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b05a",
  pageTypeSlug: "widget",
  slug: "two",
  saying: "a page holds a value",
} as const
`

export const BODIES: Readonly<Record<string, string>> = {
  [ONE_AT]: ONE_BODY,
  [TWO_AT]: TWO_BODY,
}

export const ONE: Value = {
  pageTypeSlug: WIDGET,
  slug: "one",
  saying: "a page holds a value",
  notes: [{ statement: "a page holds one" }],
}

export const TWO: Value = {
  pageTypeSlug: WIDGET,
  slug: "two",
  saying: "a page holds a value",
}

export const VALUES: ReadonlyMap<string, Value> = new Map([
  [ONE_AT, ONE],
  [TWO_AT, TWO],
])

function tokensOf(text: string): DepToken[] {
  const words = text.split(" ")
  const acting = words.indexOf(HOLDS) + 1
  const last = words.length
  let after = 0
  return words.map((form, index) => {
    const id = index + 1
    const start = text.indexOf(form, after)
    after = start + form.length
    const held = { id, form, start, end: after }
    if (id === acting) return { ...held, upos: "VERB", head: 0, deprel: "root" }
    if (id === acting - 1) return { ...held, upos: "NOUN", head: acting, deprel: "nsubj" }
    if (id === last) return { ...held, upos: "NOUN", head: acting, deprel: "obj" }
    return { ...held, upos: "DET", head: id + 1, deprel: "det" }
  })
}

export const parsing: Parsing = (text) => {
  if (!text.includes(HOLDS)) return Promise.resolve([])
  const tokens = tokensOf(text)
  return Promise.resolve([makeSentence({ text, start: 0, end: text.length, tokens })])
}

export function worldFor(
  bodies: Readonly<Record<string, string>>,
  values: ReadonlyMap<string, Value>,
  reaching: Reaching
): World {
  const source = sourceOver(VOCABULARY)
  const index = {
    kindsUnder: (of: string) => new Set([of]),
    sourceIn: () => source,
    pageAt: (pageTypeSlug: string, slug: string) => PAGES.get(`${pageTypeSlug}/${slug}`) ?? null,
    carriedIn: (value: Value, declaredBy: string) => carriedFrom(value, source, declaredBy),
    pageTypesIn: () => new Set([WIDGET]),
    everyOfType: (kind: string) =>
      kind === WIDGET ? [...values.keys()].map((path) => ({ path })) : [],
    pageByPath: (path: string) => values.get(path) ?? null,
  } as never
  const ledger = ledgerAt(NOWHERE, filesOf(bodies), reaching)
  return Object.defineProperty(ledger, "index", { value: index })
}
