import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  declaring,
  founded,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  relationFiled,
  shapeAdded,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Formatting } from "akasha/pages/name-formats/modules/format-reaching/format-reaching.module.code.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const allows: Formatting = () => (): boolean => true

const GENERATED_ID = "01a04f2b-3d23-7798-beae-c2174eaf237f"

const THING_ID = "01a04f2b-3d23-7840-8508-269224959e52"

const WAITING_ID = "01a04f2b-3d23-7841-8508-269224959e53"

const UUID_ID = "01a04f2b-3d23-7842-8508-269224959e54"

export const HELD_ID = "01a0540d-0000-7000-8000-000000000010"

export const THING_AT = "akasha/one.thing.ts"

export const THING_BODY = 'export const one = { pageTypeSlug: "thing", slug: "one" }\n'

export const THING_EXTRA = 'export const one = { pageTypeSlug: "thing", slug: "one", extra: 1 }\n'

const HELD_AT = "akasha/held.text-property.ts"

const GENERATOR_KIND = "generator-kind"

const UNIQUE_SLUG = {
  pageTypeSlug: "text-property",
  targetPageTypeSlug: null,
  unique: "page-type",
  slug: "slug",
  propertySlug: "slug",
}

function schemaFiledFor(root: string, pageTypeSlug: string, slug: string): undefined {
  shapeAdded(root, pageTypeSlug, slug, [
    { pageTypeSlug, targetPageTypeSlug: null, unique: null, slug, propertySlug: slug },
  ])
}

export function typing(id: string, slug: string, above: string, declares: string): string {
  return (
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}",` +
    ` extends: ${above}, properties: [${declares}] }\n`
  )
}

function kinding(root: string, slug: string, id: string, afterChecks: boolean): undefined {
  const at = `akasha/${slug}.${GENERATOR_KIND}.ts`
  put(
    root,
    at,
    `export const kind = { id: "${id}", pageTypeSlug: "${GENERATOR_KIND}",` +
      ` slug: "${slug}", afterChecks: ${afterChecks} }\n`
  )
  listedFiled(root, GENERATOR_KIND, slug, [{ path: at, id }])
  valueAlsoFiled(root, GENERATOR_KIND, [
    { path: at, value: { id, pageTypeSlug: GENERATOR_KIND, slug, afterChecks } },
  ])
}

export function generating(root: string, generator: string): string {
  put(
    root,
    HELD_AT,
    `export const held = { id: "${GENERATED_ID}", pageTypeSlug: "text-property",` +
      ` slug: "held", propertySlug: "held", generator: "${generator}" }\n`
  )
  kinding(root, "waiting", WAITING_ID, true)
  kinding(root, "uuid-v7", UUID_ID, false)
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
  shapeAdded(root, "text-property", "slug", [UNIQUE_SLUG])
  schemaFiledFor(root, "text-property", "held")
  schemaFiledFor(root, "relation-property", "page-type-slug")
  listedFiled(root, "text-property", "held", [{ path: HELD_AT, id: GENERATED_ID }])
  listedFiled(root, "page-type", "thing", [{ path: "akasha/thing.page-type.ts", id: THING_ID }])
  relationFiled(root, generator === "waiting" ? WAITING_ID : UUID_ID, "generator", GENERATED_ID, [
    { path: HELD_AT },
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
  shapeAdded(root, "text-property", "slug", [UNIQUE_SLUG])
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

const ROWS = "rows"

export function rooting(prefix: string = "akasha-matches-audit-"): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  declaring(root, ROWS, { pageTypeSlug: "page-property-entry" })
  typed(root, "thing", "page", [ROWS])
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
