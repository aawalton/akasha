import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { listedFiled, rebuiltIn, schemaFiled } from "@akasha/indexes/testing"
import type { Formatting } from "@akasha/pages-system/name-format/format-reaching"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import type { Carried } from "@akasha/pages-system/page-type-properties"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { type Shadow, shadowAt } from "@akasha/pages-system/shadow"
import { put } from "@akasha/testing-system/putting"
import { entryReasonsIn, type Shaping } from "./page-matches-its-type.code-check.code.ts"

export const FORMAT = "all-lower"

const AKASHA = "akasha"

const TYPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000001",
    pageTypeSlug: "page-type",
    slug: "page",
    extendsSlug: [],
    properties: [
      { pagePropertySlug: "id", required: true, many: false },
      { pagePropertySlug: "slug", required: true, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000002",
    pageTypeSlug: "page-type",
    slug: "module",
    extendsSlug: ["page-type/page"],
    properties: [{ pagePropertySlug: "test", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000003",
    pageTypeSlug: "page-type",
    slug: "check",
    extendsSlug: ["page-type/module"],
    properties: [
      { pagePropertySlug: "test", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, max: 2, total: 6 },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000004",
    pageTypeSlug: "page-type",
    slug: "told",
    extendsSlug: ["page-type/page"],
    properties: [
      { pagePropertySlug: "directives", required: false, many: true, max: null },
      { pagePropertySlug: "aids", required: false, many: true, max: null },
      { pagePropertySlug: "tally", required: false, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000005",
    pageTypeSlug: "page-type",
    slug: "looping",
    extendsSlug: ["page-type/looping"],
    properties: [{ pagePropertySlug: "id", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000010",
    pageTypeSlug: "page-type",
    slug: "held",
    extendsSlug: ["page-type/page"],
    properties: [
      { pagePropertySlug: "page-type-slug", required: true, many: false },
      { pagePropertySlug: "test", required: true, many: false },
    ],
  },
]

const SHAPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000017",
    pageTypeSlug: "page-type",
    slug: "page-type",
    extendsSlug: ["page-type/page"],
    properties: [
      { pagePropertySlug: "extends-slug", required: false, many: false },
      { pagePropertySlug: "page-type-slug", required: false, many: false },
      { pagePropertySlug: "properties", required: false, many: true, max: null },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000018",
    pageTypeSlug: "page-type",
    slug: "boolean-property",
    extendsSlug: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000006",
    pageTypeSlug: "page-type",
    slug: "text-property",
    extendsSlug: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000007",
    pageTypeSlug: "page-type",
    slug: "record-property",
    extendsSlug: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000008",
    pageTypeSlug: "page-type",
    slug: "number-property",
    extendsSlug: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-00000000000f",
    pageTypeSlug: "page-type",
    slug: "relation-property",
    extendsSlug: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000012",
    pageTypeSlug: "page-type",
    slug: "name-format",
    extendsSlug: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000015",
    pageTypeSlug: "page-type",
    slug: "worded-property",
    extendsSlug: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000013",
    pageTypeSlug: "name-format",
    slug: FORMAT,
    code: "ts",
  },
]

const PROPERTIES: Record<string, Value> = {
  id: {
    id: "01a0540d-0000-7000-8000-000000000009",
    pageTypeSlug: "text-property",
    slug: "id",
    propertySlug: "id",
    max: 36,
    unique: "always",
  },
  slug: {
    id: "01a0540d-0000-7000-8000-00000000000a",
    pageTypeSlug: "text-property",
    slug: "slug",
    propertySlug: "slug",
    max: 8,
    nameFormatSlug: FORMAT,
    unique: "page-type",
  },
  test: {
    id: "01a0540d-0000-7000-8000-00000000000b",
    pageTypeSlug: "text-property",
    slug: "test",
    propertySlug: "test",
    max: 4,
  },
  aids: {
    id: "01a0540d-0000-7000-8000-00000000000c",
    pageTypeSlug: "text-property",
    slug: "aids",
    propertySlug: "aids",
    max: 5,
  },
  name: {
    id: "01a0540d-0000-7000-8000-00000000000d",
    pageTypeSlug: "text-property",
    slug: "name",
    propertySlug: "name",
    max: 8,
    nameFormatSlug: FORMAT,
  },
  tag: {
    id: "01a0540d-0000-7000-8000-000000000014",
    pageTypeSlug: "text-property",
    slug: "tag",
    propertySlug: "tag",
    max: 4,
  },
  tally: {
    id: "01a0540d-0000-7000-8000-000000000016",
    pageTypeSlug: "worded-property",
    slug: "tally",
    propertySlug: "tally",
    max: 4,
  },
  "extends-slug": {
    id: "01a0540d-0000-7000-8000-000000000019",
    pageTypeSlug: "relation-property",
    slug: "extends-slug",
    propertySlug: "extends-slug",
  },
  "page-property-slug": {
    id: "01a0540d-0000-7000-8000-00000000001a",
    pageTypeSlug: "relation-property",
    slug: "page-property-slug",
    propertySlug: "page-property-slug",
  },
  required: {
    id: "01a0540d-0000-7000-8000-00000000001b",
    pageTypeSlug: "boolean-property",
    slug: "required",
    propertySlug: "required",
  },
  many: {
    id: "01a0540d-0000-7000-8000-00000000001c",
    pageTypeSlug: "boolean-property",
    slug: "many",
    propertySlug: "many",
  },
  max: {
    id: "01a0540d-0000-7000-8000-00000000001d",
    pageTypeSlug: "number-property",
    slug: "max",
    propertySlug: "max",
    max: null,
  },
  total: {
    id: "01a0540d-0000-7000-8000-00000000001e",
    pageTypeSlug: "number-property",
    slug: "total",
    propertySlug: "total",
    max: null,
  },
  properties: {
    id: "01a0540d-0000-7000-8000-00000000001f",
    pageTypeSlug: "record-property",
    slug: "properties",
    propertySlug: "properties",
    properties: [
      { pagePropertySlug: "page-property-slug", required: true, many: false },
      { pagePropertySlug: "required", required: false, many: false },
      { pagePropertySlug: "many", required: false, many: false },
      { pagePropertySlug: "max", required: false, many: false },
      { pagePropertySlug: "total", required: false, many: false },
    ],
  },
  "page-type-slug": {
    id: "01a0540d-0000-7000-8000-000000000011",
    pageTypeSlug: "relation-property",
    slug: "page-type-slug",
    propertySlug: "page-type-slug",
  },
  directives: {
    id: "01a0540d-0000-7000-8000-00000000000e",
    pageTypeSlug: "record-property",
    slug: "directives",
    propertySlug: "directives",
    properties: [
      { pagePropertySlug: "name", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, max: 3, total: 6 },
      { pagePropertySlug: "text-property/tag", required: false, many: false },
    ],
  },
}

const JUDGING =
  `export function ${exportedAs(FORMAT)}(name: string): boolean {\n` +
  "  return name === name.toLowerCase()\n" +
  "}\n"

export function seeded(root: string): Shadow {
  for (const one of [...TYPES, ...SHAPES, ...Object.values(PROPERTIES)]) {
    const slug = String(one["slug"])
    const at = `${AKASHA}/${slug}.${String(one["pageTypeSlug"])}.ts`
    put(root, at, `export const ${exportedAs(slug)} = ${JSON.stringify(one)}\n`)
  }
  put(root, `${AKASHA}/${FORMAT}.name-format.code.ts`, JUDGING)
  rebuiltIn(root, AKASHA)
  return shadowAt(root)
}

const GENERATED_ID = "01a04f2b-3d23-7798-beae-c2174eaf237f"

const THING_ID = "01a04f2b-3d23-7840-8508-269224959e52"

export const HELD_ID = "01a0540d-0000-7000-8000-000000000010"

export const THING_AT = "akasha/one.thing.ts"

export const THING_BODY = 'export const one = { pageTypeSlug: "thing", slug: "one" }\n'

const KIND_AT = "akasha/waiting.generator-kind.ts"

const UNIQUE_SLUG = {
  pageTypeSlug: "text-property",
  targetPageTypeSlug: null,
  unique: "page-type",
  slug: "slug",
  propertySlug: "slug",
}

function schemaFiledFor(root: string, pageTypeSlug: string, slug: string): undefined {
  schemaFiled(root, pageTypeSlug, slug, [
    { pageTypeSlug, targetPageTypeSlug: null, unique: null, slug, propertySlug: slug },
  ])
}

export function typing(id: string, slug: string, above: string, declares: string): string {
  return (
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}",` +
    ` extendsSlug: ${above}, properties: [${declares}] }\n`
  )
}

export function generating(root: string, generator: string): string {
  put(
    root,
    "akasha/held.text-property.ts",
    `export const held = { id: "${GENERATED_ID}", pageTypeSlug: "text-property",` +
      ` slug: "held", generator: "${generator}" }\n`
  )
  put(
    root,
    KIND_AT,
    `export const kind = { id: "${GENERATED_ID}", pageTypeSlug: "generator-kind",` +
      ' slug: "waiting", afterChecks: true }\n'
  )
  put(
    root,
    "akasha/uuid-v7.generator-kind.ts",
    `export const kind = { id: "${GENERATED_ID}", pageTypeSlug: "generator-kind",` +
      ' slug: "uuid-v7", afterChecks: false }\n'
  )
  put(
    root,
    "akasha/thing.page-type.ts",
    typing(
      THING_ID,
      "thing",
      "null",
      '{ pagePropertySlug: "held", required: true, many: false },' +
        ' { pagePropertySlug: "page-type-slug", required: true, many: false },' +
        ' { pagePropertySlug: "slug", required: true, many: false }'
    )
  )
  schemaFiled(root, "text-property", "slug", [UNIQUE_SLUG])
  schemaFiledFor(root, "text-property", "held")
  schemaFiledFor(root, "relation-property", "page-type-slug")
  listedFiled(root, "text-property", "held", [
    { path: "akasha/held.text-property.ts", id: GENERATED_ID },
  ])
  listedFiled(root, "page-type", "thing", [{ path: "akasha/thing.page-type.ts", id: THING_ID }])
  listedFiled(root, "generator-kind", "waiting", [{ path: KIND_AT, id: GENERATED_ID }])
  listedFiled(root, "generator-kind", "uuid-v7", [
    { path: "akasha/uuid-v7.generator-kind.ts", id: GENERATED_ID },
  ])
  return root
}

export const ALPHA_AT = "akasha/alpha.page-type.ts"

const BOTH = '{ pagePropertySlug: "page-type-slug" }'

export const WAS_ALPHA = typing(THING_ID, "alpha", "null", BOTH)

export const BETA_AT = "akasha/beta.page-type.ts"

export const NOW_BETA = typing(
  GENERATED_ID,
  "beta",
  "null",
  `${BOTH}, { pagePropertySlug: "note" }`
)

export const NOW_ALPHA = typing(THING_ID, "alpha", '"page-type/beta"', BOTH)

const PAGE_TYPE_ID = "01a0540d-0000-7000-8000-000000000020"

const ROOT_ID = "01a0540d-0000-7000-8000-000000000021"

function grounding(root: string): undefined {
  const pageAt = "akasha/page.page-type.ts"
  const held = '{ pagePropertySlug: "id" }, { pagePropertySlug: "slug" }'
  put(root, pageAt, typing(ROOT_ID, "page", "null", held))
  schemaFiledFor(root, "text-property", "id")
  listedFiled(root, "page-type", "page", [{ path: pageAt, id: ROOT_ID }])
  const typeAt = "akasha/page-type.page-type.ts"
  const declares =
    '{ pagePropertySlug: "extends-slug" }, { pagePropertySlug: "page-type-slug" }' +
    ', { pagePropertySlug: "properties", many: true, max: null }'
  put(root, typeAt, typing(PAGE_TYPE_ID, "page-type", '"page-type/page"', declares))
  listedFiled(root, "page-type", "page-type", [{ path: typeAt, id: PAGE_TYPE_ID }])
  schemaFiledFor(root, "relation-property", "extends-slug")
  schemaFiledFor(root, "relation-property", "page-type-slug")
  schemaFiledFor(root, "record-property", "properties")
}

export function extending(root: string): string {
  grounding(root)
  put(root, ALPHA_AT, WAS_ALPHA)
  schemaFiled(root, "text-property", "slug", [UNIQUE_SLUG])
  schemaFiledFor(root, "relation-property", "page-type-slug")
  schemaFiledFor(root, "text-property", "note")
  listedFiled(root, "page-type", "alpha", [{ path: ALPHA_AT, id: THING_ID }])
  return root
}

export const ONE_HELD_AT = "akasha/one.held.ts"

export const ONE_HELD =
  'export const one = { id: "01a0540d-0000-7000-8000-0000000000ff",' +
  ' pageTypeSlug: "held", slug: "one", test: "ts" }\n'

const DEMANDS =
  '{ pagePropertySlug: "page-type-slug", required: true, many: false }, ' +
  '{ pagePropertySlug: "test", required: true, many: false }'

export const NARROWED = `${DEMANDS}, { pagePropertySlug: "name", required: true, many: false }`

const REPO = join(import.meta.dir, "..", "..", "..", "..", "..")

const RESTATEMENT = "akasha/agents/models/tests/pages/restatement/restatement.model-test.ts"

export const NO_ID = "keeps an entry of `cases` carrying no id, and every entry carries an id"

export const ID_LESS = '{"page":"a","definition":"b","statement":"c","answer":"YES"}\n'

const ANSWER: Carried = {
  pagePropertySlug: "case-answer",
  pageTypeSlug: "text-property",
  propertySlug: "answer",
  key: "answer",
  unique: null,
  declaredBy: "cases",
  required: true,
  many: false,
  max: null,
  total: null,
  uncommitted: false,
  secret: false,
}

export function shapingFor(formatting: Formatting): Shaping {
  return { fields: new Map([["answer", ANSWER]]), slug: "cases", pageFor: () => null, formatting }
}

const CASES = `${RESTATEMENT.slice(0, -3)}.cases`

function judged(formatting: Formatting, beside: (at: string) => string | null): readonly string[] {
  const shadow = shadowAt(REPO)
  return entryReasonsIn(
    valueAt(RESTATEMENT, REPO) ?? {},
    shadow.index.propertiesOf("model-test"),
    shadow,
    RESTATEMENT,
    beside,
    formatting
  )
}

export function entriesJudged(formatting: Formatting, text: string | null): readonly string[] {
  return judged(formatting, (at) => {
    if (text !== null) return at === `${CASES}.jsonl` ? text : null
    return existsSync(join(REPO, at)) ? readFileSync(join(REPO, at), "utf8") : null
  })
}

export function partsJudged(formatting: Formatting, one: string, two: string): readonly string[] {
  const held = new Map([
    [`${CASES}.jsonl`, one],
    [`${CASES}.part2.jsonl`, two],
  ])
  return judged(formatting, (at) => held.get(at) ?? null)
}

export function besideCarried(uncommitted: boolean, secret = false): readonly Carried[] {
  return [
    {
      pagePropertySlug: "test",
      pageTypeSlug: "text-property",
      propertySlug: "test",
      key: "test",
      unique: null,
      declaredBy: "beside",
      required: true,
      many: false,
      max: null,
      total: null,
      uncommitted,
      secret,
    },
  ]
}
