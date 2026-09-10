import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { listedFiled, rebuiltIn, schemaFiled } from "@akasha/indexes/testing"
import { exportedAs } from "@akasha/pages/page-export-name"
import type { Carried } from "@akasha/pages/page-type-properties"
import type { Value } from "@akasha/pages/page-value"
import { type Shadow, shadowAt } from "@akasha/pages/shadow"
import { ran } from "@akasha/utils/run/running"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"

export const FORMAT = "all-lower"

const AKASHA = "akasha"

const TYPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000001",
    pageTypeSlug: "page-type",
    slug: "page",
    extends: [],
    properties: [
      { pagePropertySlug: "id", required: true, many: false },
      { pagePropertySlug: "slug", required: true, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000002",
    pageTypeSlug: "page-type",
    slug: "module",
    extends: ["page-type/page"],
    properties: [{ pagePropertySlug: "test", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000003",
    pageTypeSlug: "page-type",
    slug: "check",
    extends: ["page-type/module"],
    properties: [
      { pagePropertySlug: "test", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, maxCount: 2, maxLength: 3 },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000004",
    pageTypeSlug: "page-type",
    slug: "told",
    extends: ["page-type/page"],
    properties: [
      { pagePropertySlug: "directives", required: false, many: true, maxCount: null },
      { pagePropertySlug: "aids", required: false, many: true, maxCount: null },
      { pagePropertySlug: "tally", required: false, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000005",
    pageTypeSlug: "page-type",
    slug: "looping",
    extends: ["page-type/looping"],
    properties: [{ pagePropertySlug: "id", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000010",
    pageTypeSlug: "page-type",
    slug: "held",
    extends: ["page-type/page"],
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
    extends: ["page-type/page"],
    properties: [
      { pagePropertySlug: "extends-type", required: false, many: true, maxCount: null },
      { pagePropertySlug: "page-type-slug", required: false, many: false },
      { pagePropertySlug: "properties", required: false, many: true, maxCount: null },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000018",
    pageTypeSlug: "page-type",
    slug: "boolean-property",
    extends: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000006",
    pageTypeSlug: "page-type",
    slug: "text-property",
    extends: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000007",
    pageTypeSlug: "page-type",
    slug: "record-property",
    extends: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000008",
    pageTypeSlug: "page-type",
    slug: "number-property",
    extends: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-00000000000f",
    pageTypeSlug: "page-type",
    slug: "relation-property",
    extends: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000012",
    pageTypeSlug: "page-type",
    slug: "name-format",
    extends: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000015",
    pageTypeSlug: "page-type",
    slug: "worded-property",
    extends: ["page-type/page"],
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
    maxLength: 36,
    unique: "page",
  },
  slug: {
    id: "01a0540d-0000-7000-8000-00000000000a",
    pageTypeSlug: "text-property",
    slug: "slug",
    propertySlug: "slug",
    maxLength: 8,
    nameFormat: FORMAT,
    unique: "page-type",
  },
  test: {
    id: "01a0540d-0000-7000-8000-00000000000b",
    pageTypeSlug: "text-property",
    slug: "test",
    propertySlug: "test",
    maxLength: 4,
  },
  aids: {
    id: "01a0540d-0000-7000-8000-00000000000c",
    pageTypeSlug: "text-property",
    slug: "aids",
    propertySlug: "aids",
    maxLength: 5,
  },
  name: {
    id: "01a0540d-0000-7000-8000-00000000000d",
    pageTypeSlug: "text-property",
    slug: "name",
    propertySlug: "name",
    maxLength: 8,
    nameFormat: FORMAT,
  },
  tag: {
    id: "01a0540d-0000-7000-8000-000000000014",
    pageTypeSlug: "text-property",
    slug: "tag",
    propertySlug: "tag",
    maxLength: 4,
  },
  tally: {
    id: "01a0540d-0000-7000-8000-000000000016",
    pageTypeSlug: "worded-property",
    slug: "tally",
    propertySlug: "tally",
    maxLength: 4,
  },
  "extends-type": {
    id: "01a0540d-0000-7000-8000-000000000019",
    pageTypeSlug: "relation-property",
    slug: "extends-type",
    propertySlug: "extends",
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
  "max-count": {
    id: "01a0540d-0000-7000-8000-00000000001d",
    pageTypeSlug: "number-property",
    slug: "max-count",
    propertySlug: "maxCount",
    max: null,
  },
  "max-length": {
    id: "01a0540d-0000-7000-8000-00000000001e",
    pageTypeSlug: "number-property",
    slug: "max-length",
    propertySlug: "maxLength",
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
      { pagePropertySlug: "max-count", required: false, many: false },
      { pagePropertySlug: "max-length", required: false, many: false },
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
      { pagePropertySlug: "aids", required: false, many: true, maxCount: 3, maxLength: 4 },
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

export const THING_EXTRA = 'export const one = { pageTypeSlug: "thing", slug: "one", extra: 1 }\n'

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
    ` extends: ${above}, properties: [${declares}] }\n`
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
      "[]",
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

export const WAS_ALPHA = typing(THING_ID, "alpha", "[]", BOTH)

export const BETA_AT = "akasha/beta.page-type.ts"

export const NOW_BETA = typing(GENERATED_ID, "beta", "[]", `${BOTH}, { pagePropertySlug: "note" }`)

export const NOW_ALPHA = typing(THING_ID, "alpha", '["page-type/beta"]', BOTH)

const PAGE_TYPE_ID = "01a0540d-0000-7000-8000-000000000020"

const ROOT_ID = "01a0540d-0000-7000-8000-000000000021"

function grounding(root: string): undefined {
  const pageAt = "akasha/page.page-type.ts"
  const held = '{ pagePropertySlug: "id" }, { pagePropertySlug: "slug" }'
  put(root, pageAt, typing(ROOT_ID, "page", "[]", held))
  schemaFiledFor(root, "text-property", "id")
  listedFiled(root, "page-type", "page", [{ path: pageAt, id: ROOT_ID }])
  const typeAt = "akasha/page-type.page-type.ts"
  const declares =
    '{ pagePropertySlug: "extends", many: true, maxCount: null }, { pagePropertySlug: "page-type-slug" }' +
    ', { pagePropertySlug: "properties", many: true, maxCount: null }'
  put(root, typeAt, typing(PAGE_TYPE_ID, "page-type", '["page-type/page"]', declares))
  listedFiled(root, "page-type", "page-type", [{ path: typeAt, id: PAGE_TYPE_ID }])
  schemaFiledFor(root, "relation-property", "extends")
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
      maxCount: null,
      maxLength: null,
      uncommitted,
      secret,
    },
  ]
}

export const scratch = scratchWorld()

export function rooting(prefix: string = "akasha-matches-audit-"): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, "thing", "page")
  return root
}

export function wrote(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, said] of Object.entries(files)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, said)
  }
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = wrote(rooting(), files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
