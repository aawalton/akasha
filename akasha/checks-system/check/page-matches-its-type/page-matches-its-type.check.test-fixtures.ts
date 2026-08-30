import { join } from "node:path"
import type { Value } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { indexIn } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { rebuiltFrom } from "../../../pages-system/indexes/indexing/indexing.module.code.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { type Shadow, shadowAt } from "../../../pages-system/shadow/shadow.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"

export const FORMAT = "all-lower"

const AKASHA = "akasha"

const TYPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000001",
    pageTypeSlug: "page-type",
    slug: "page",
    extendsSlug: null,
    properties: [
      { pagePropertySlug: "id", required: true, many: false },
      { pagePropertySlug: "slug", required: true, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000002",
    pageTypeSlug: "page-type",
    slug: "module",
    extendsSlug: "page-type/page",
    properties: [{ pagePropertySlug: "test", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000003",
    pageTypeSlug: "page-type",
    slug: "check",
    extendsSlug: "page-type/module",
    properties: [
      { pagePropertySlug: "test", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, max: 2, total: 6 },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000004",
    pageTypeSlug: "page-type",
    slug: "told",
    extendsSlug: "page-type/page",
    properties: [
      { pagePropertySlug: "directives", required: false, many: true, max: null },
      { pagePropertySlug: "aids", required: false, many: true, max: null },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000005",
    pageTypeSlug: "page-type",
    slug: "looping",
    extendsSlug: "page-type/looping",
    properties: [{ pagePropertySlug: "id", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000010",
    pageTypeSlug: "page-type",
    slug: "held",
    extendsSlug: "page-type/page",
    properties: [
      { pagePropertySlug: "page-type-slug", required: true, many: false },
      { pagePropertySlug: "test", required: true, many: false },
    ],
  },
]

const SHAPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000006",
    pageTypeSlug: "page-type",
    slug: "text-property",
    extendsSlug: null,
  },
  {
    id: "01a0540d-0000-7000-8000-000000000007",
    pageTypeSlug: "page-type",
    slug: "record-property",
    extendsSlug: null,
  },
  {
    id: "01a0540d-0000-7000-8000-000000000008",
    pageTypeSlug: "page-type",
    slug: "number-property",
    extendsSlug: null,
  },
  {
    id: "01a0540d-0000-7000-8000-00000000000f",
    pageTypeSlug: "page-type",
    slug: "relation-property",
    extendsSlug: null,
  },
  {
    id: "01a0540d-0000-7000-8000-000000000012",
    pageTypeSlug: "page-type",
    slug: "name-format",
    extendsSlug: null,
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
  rebuiltFrom(join(root, AKASHA), indexIn(root), root)
  return shadowAt(root)
}

export const property = (slug: string): Value | null => PROPERTIES[slug] ?? null

const GENERATED_ID = "01a04f2b-3d23-7798-beae-c2174eaf237f"

const THING_ID = "01a04f2b-3d23-7840-8508-269224959e52"

export const HELD_ID = "01a0540d-0000-7000-8000-000000000010"

export const THING_AT = "akasha/one.thing.ts"

export const THING_BODY = 'export const one = { pageTypeSlug: "thing", slug: "one" }\n'

const KIND_AT = "akasha/waiting.generator-kind.ts"

const UNIQUE_SLUG =
  '{"pageTypeSlug":"text-property","targetPageTypeSlug":null,"unique":"page-type",' +
  '"slug":"slug","propertySlug":"slug"}\n'

function schemaLine(pageTypeSlug: string, slug: string): string {
  return (
    `{"pageTypeSlug":"${pageTypeSlug}","targetPageTypeSlug":null,"unique":null,` +
    `"slug":"${slug}","propertySlug":"${slug}"}\n`
  )
}

export function typing(id: string, slug: string, above: string, declares: string): string {
  return (
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}",` +
    ` extendsSlug: ${above}, properties: [${declares}] }\n`
  )
}

const PAGE_TYPE_SLUG = "schema/page-property/relation-property/slug/page-type-slug.jsonl"

const SLUG_FILED = "schema/page-property/text-property/slug/slug.jsonl"

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
  const index = indexIn(root)
  put(index, SLUG_FILED, UNIQUE_SLUG)
  put(
    index,
    "schema/page-property/text-property/slug/held.jsonl",
    schemaLine("text-property", "held")
  )
  put(index, PAGE_TYPE_SLUG, schemaLine("relation-property", "page-type-slug"))
  put(
    index,
    "identity/text-property/slug/held.jsonl",
    `{"path":"akasha/held.text-property.ts","id":"${GENERATED_ID}"}\n`
  )
  put(
    index,
    "identity/page-type/slug/thing.jsonl",
    `{"path":"akasha/thing.page-type.ts","id":"${THING_ID}"}\n`
  )
  put(
    index,
    "identity/generator-kind/slug/waiting.jsonl",
    `{"path":"${KIND_AT}","id":"${GENERATED_ID}"}\n`
  )
  put(
    index,
    "identity/generator-kind/slug/uuid-v7.jsonl",
    `{"path":"akasha/uuid-v7.generator-kind.ts","id":"${GENERATED_ID}"}\n`
  )
  return root
}

export const ALPHA_AT = "akasha/alpha.page-type.ts"

export const BOTH = '{ pagePropertySlug: "page-type-slug" }'

export const WAS_ALPHA = typing(THING_ID, "alpha", "null", BOTH)

export const BETA_AT = "akasha/beta.page-type.ts"

export const NOW_BETA = typing(
  GENERATED_ID,
  "beta",
  "null",
  `${BOTH}, { pagePropertySlug: "note" }`
)

export const NOW_ALPHA = typing(THING_ID, "alpha", '"page-type/beta"', BOTH)

export function extending(root: string): string {
  put(root, ALPHA_AT, WAS_ALPHA)
  const index = indexIn(root)
  put(index, SLUG_FILED, UNIQUE_SLUG)
  put(index, PAGE_TYPE_SLUG, schemaLine("relation-property", "page-type-slug"))
  put(
    index,
    "schema/page-property/text-property/slug/note.jsonl",
    schemaLine("text-property", "note")
  )
  put(index, "identity/page-type/slug/alpha.jsonl", `{"path":"${ALPHA_AT}","id":"${THING_ID}"}\n`)
  return root
}
