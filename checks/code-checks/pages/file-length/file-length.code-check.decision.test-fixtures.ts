import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  pageFilingFrom,
  relationFiled,
  shapeAdded,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const scratch = scratchWorld()

export const LOCKFILE = "bun.lock"

export const ELSEWHERE = "node_modules/one/bun.lock"

export const SKETCHBOOK = "sketchbook.lock"

const PROPERTY_AT = "akasha/lockfile.file-property.ts"

const PROPERTY_ID = "01a06d55-0000-7000-8000-00000000000a"

const TYPE_AT = "akasha/workspace.page-type.ts"

const TYPE_ID = "01a06d55-0000-7000-8000-00000000000b"

const OWNER_AT = "one.workspace.ts"

const OWNER_ID = "01a06d55-0000-7000-8000-00000000000c"

const SKETCH_AT = "akasha/sketchbook.drafted-file-property.ts"

const SKETCH_ID = "01a06d55-0000-7000-8000-00000000000d"

const FILE_PROPERTY = "file-property"

const PAGE_TYPE = "page-type"

const WORKSPACE = "workspace"

const DRAFTED = "drafted-file-property"

const STEM = "01a06d55-0000-7000-8000-0000000000"

const ABOVE: readonly (readonly [string, string])[] = [
  [FILE_PROPERTY, "page-type/page-property"],
  [DRAFTED, `page-type/${FILE_PROPERTY}`],
]

const CARRIED: readonly Value[] = [
  { pageTypeSlug: FILE_PROPERTY, slug: "patch", propertySlug: "patch", runsFileLength: false },
  { pageTypeSlug: FILE_PROPERTY, slug: "notes", propertySlug: "notes" },
  { pageTypeSlug: DRAFTED, slug: "sketch", propertySlug: "sketch", runsFileLength: false },
]

function bodyAt(root: string, at: string, value: Value): undefined {
  const path = join(root, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `export const held = ${JSON.stringify(value)}\n`)
}

function alsoSeeded(root: string): undefined {
  const filing = pageFilingFrom(root, STEM)
  for (const [slug, above] of ABOVE) {
    const value = { pageTypeSlug: PAGE_TYPE, slug, extends: [above] }
    const at = `akasha/${slug}.page-type.ts`
    const id = filing(PAGE_TYPE, slug, at, value)
    bodyAt(root, at, { id, ...value })
  }
  for (const value of CARRIED) {
    const kind = String(value["pageTypeSlug"])
    const slug = String(value["slug"])
    shapeAdded(root, kind, slug, [
      { pageTypeSlug: kind, targetPageTypeSlug: null, unique: null, slug, propertySlug: slug },
    ])
    const at = `akasha/${slug}.${kind}.ts`
    const id = filing(kind, slug, at, value)
    bodyAt(root, at, { id, ...value })
    relationFiled(root, id, "page-property", TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  }
}

function besideFiled(root: string, kind: string, slug: string, at: string, id: string): undefined {
  listedFiled(root, kind, slug, [{ path: at, id }])
  idFiled(root, id, [{ path: at, id }])
  relationFiled(root, id, "page-property", TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
}

export function seeded(value: Value): string {
  const root = scratch.rootFor("akasha-file-length-")
  besideFiled(root, FILE_PROPERTY, "lockfile", PROPERTY_AT, PROPERTY_ID)
  shapeAdded(root, FILE_PROPERTY, "lockfile", [
    {
      pageTypeSlug: FILE_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: "lockfile",
      propertySlug: "lockfile",
      fileName: LOCKFILE,
    },
  ])
  const lockfile = { id: PROPERTY_ID, pageTypeSlug: FILE_PROPERTY, slug: "lockfile", ...value }
  valueAlsoFiled(root, FILE_PROPERTY, [{ path: PROPERTY_AT, value: lockfile }])
  bodyAt(root, PROPERTY_AT, lockfile)
  besideFiled(root, DRAFTED, "sketchbook", SKETCH_AT, SKETCH_ID)
  shapeAdded(root, DRAFTED, "sketchbook", [
    {
      pageTypeSlug: DRAFTED,
      targetPageTypeSlug: null,
      unique: null,
      slug: "sketchbook",
      propertySlug: "sketchbook",
      fileName: SKETCHBOOK,
    },
  ])
  const sketchbook = {
    id: SKETCH_ID,
    pageTypeSlug: DRAFTED,
    slug: "sketchbook",
    ...value,
    fileName: SKETCHBOOK,
  }
  valueAlsoFiled(root, DRAFTED, [{ path: SKETCH_AT, value: sketchbook }])
  bodyAt(root, SKETCH_AT, sketchbook)
  listedFiled(root, PAGE_TYPE, WORKSPACE, [{ path: TYPE_AT, id: TYPE_ID }])
  valueAlsoFiled(root, PAGE_TYPE, [
    { path: TYPE_AT, value: { id: TYPE_ID, pageTypeSlug: PAGE_TYPE, slug: WORKSPACE } },
  ])
  idFiled(root, TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  listedFiled(root, WORKSPACE, "one", [{ path: OWNER_AT, id: OWNER_ID }])
  valueAlsoFiled(root, WORKSPACE, [
    { path: OWNER_AT, value: { id: OWNER_ID, pageTypeSlug: WORKSPACE, slug: "one" } },
  ])
  alsoSeeded(root)
  return root
}

export function letOff(): string {
  return seeded({ fileName: LOCKFILE, runsFileLength: false })
}
