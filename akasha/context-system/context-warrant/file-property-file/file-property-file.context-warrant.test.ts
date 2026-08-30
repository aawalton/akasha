import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { indexed, pathsOf } from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { knowingIn, standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"
import { filePropertyFile, PAGE, PROPERTY } from "./file-property-file.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_AT = "akasha/thing/thing.module.ts"

const CODE_AT = "akasha/thing/thing.module.code.ts"

const TEST_AT = "akasha/thing/thing.module.test.ts"

const CODE_PROPERTY_AT = "akasha/properties/code.file-property.ts"

const TEST_PROPERTY_AT = "akasha/properties/test.file-property.ts"

const TYPE_AT = "akasha/file-property/file-property.page-type.ts"

let minted = 0

function pageType(root: string, slug: string): string {
  minted = minted + 1
  const id = `01a04bc4-0000-7000-8000-${String(minted).padStart(12, "0")}`
  const path = `akasha/${slug}/${slug}.page-type.ts`
  standing(
    root,
    path,
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}" }\n`
  )
  indexed(root, `identity/page-type/slug/${slug}.jsonl`, JSON.stringify({ path, id }))
  return path
}

function schemaed(root: string, slug: string, pageTypeSlug: string): undefined {
  indexed(
    root,
    `schema/page-property/slug/${slug}.jsonl`,
    JSON.stringify({ pageTypeSlug, targetPageTypeSlug: null })
  )
}

function filed(root: string, slug: string, pageTypeSlug: string): string {
  minted = minted + 1
  const id = `01a04bc4-0000-7000-8000-${String(minted).padStart(12, "0")}`
  const path = `akasha/properties/${slug}.${pageTypeSlug}.ts`
  standing(
    root,
    path,
    `export const held = { id: "${id}", pageTypeSlug: "${pageTypeSlug}", slug: "${slug}" }\n`
  )
  indexed(root, `identity/${pageTypeSlug}/slug/${slug}.jsonl`, JSON.stringify({ path, id }))
  return path
}

function property(root: string, slug: string, pageTypeSlug: string): string {
  const path = filed(root, slug, pageTypeSlug)
  schemaed(root, slug, pageTypeSlug)
  return path
}

function propertyWorld(root: string): string {
  pageType(root, "module")
  pageType(root, "file-property")
  const held = property(root, "code", "file-property")
  property(root, "test", "file-property")
  standing(root, PAGE_AT, "page\n")
  return held
}

function warrantsAt(root: string, path: string): readonly Warrant[] {
  return filePropertyFile(root, path, knowingIn(root))
}

test("a code file warrants the page it stands beside and the page defining its property", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  const held = propertyWorld(root)
  standing(root, CODE_AT, "code\n")
  expect(pathsOf(warrantsAt(root, CODE_AT))).toEqual([PAGE_AT, held])
  expect(held).toBe(CODE_PROPERTY_AT)
})

test("the property is warranted by its own page, never by the page type it answers to", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  standing(root, CODE_AT, "code\n")
  expect(standingOf(root, TYPE_AT)).not.toBeNull()
  expect(pathsOf(warrantsAt(root, CODE_AT))).not.toContain(TYPE_AT)
})

test("a test file standing beside the same page warrants that page and its own property", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  standing(root, TEST_AT, "test\n")
  expect(pathsOf(warrantsAt(root, TEST_AT))).toEqual([PAGE_AT, TEST_PROPERTY_AT])
})

test("the page and the property are owed for their own reasons, each by the body standing there", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  standing(root, CODE_AT, "code\n")
  const held = warrantsAt(root, CODE_AT)
  for (const one of held) {
    expect(one.oid).toBe(
      blobIdOf(new TextEncoder().encode(readFileSync(join(root, one.path), "utf8")))
    )
  }
  expect(held[0]?.owed).toBe(PAGE)
  expect(held[1]?.owed).toBe(PROPERTY)
  expect(PAGE).not.toBe(PROPERTY)
})

test("a page is no property's file, and warrants nothing here", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  expect(pathsOf(warrantsAt(root, PAGE_AT))).toEqual([])
})

test("a file whose page is not there warrants nothing, there being no page it is one property of", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  standing(root, CODE_AT, "code\n")
  rmSync(join(root, PAGE_AT))
  expect(pathsOf(warrantsAt(root, CODE_AT))).toEqual([])
})

test("a file naming a property no page defines still warrants the page it stands beside", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  const loose = "akasha/thing/thing.module.notes.ts"
  standing(root, loose, "notes\n")
  expect(pathsOf(warrantsAt(root, loose))).toEqual([PAGE_AT])
})

test("a file whose tail names a page type is read as a page, never as a property's file", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  const named = "akasha/thing/thing.module.page-type.ts"
  standing(root, named, "page\n")
  expect(pathsOf(warrantsAt(root, named))).toEqual([])
})

test("a property whose page is not there warrants the page alone", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  standing(root, CODE_AT, "code\n")
  rmSync(join(root, CODE_PROPERTY_AT))
  expect(pathsOf(warrantsAt(root, CODE_AT))).toEqual([PAGE_AT])
})

test("a property the schema does not name warrants the page alone, though a page of that slug stands", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  filed(root, "notes", "file-property")
  const loose = "akasha/thing/thing.module.notes.ts"
  standing(root, loose, "notes\n")
  expect(pathsOf(warrantsAt(root, loose))).toEqual([PAGE_AT])
})

test("a property the index files under no page warrants the page alone", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  schemaed(root, "notes", "text-property")
  const loose = "akasha/thing/thing.module.notes.ts"
  standing(root, loose, "notes\n")
  expect(pathsOf(warrantsAt(root, loose))).toEqual([PAGE_AT])
})

test("a cold index knows no page type, so no file stands beside a page", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  standing(root, PAGE_AT, "page\n")
  standing(root, CODE_AT, "code\n")
  expect(pathsOf(warrantsAt(root, CODE_AT))).toEqual([])
})

test("a file that is no page's own warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  const loose = "akasha/thing/loose.ts"
  standing(root, loose, "loose\n")
  expect(pathsOf(warrantsAt(root, loose))).toEqual([])
})

test("a file standing beside a property's file stands beside no page", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  standing(root, CODE_AT, "code\n")
  const under = "akasha/thing/thing.module.code.notes.ts"
  standing(root, under, "notes\n")
  expect(pathsOf(warrantsAt(root, under))).toEqual([])
})

test("a path not written as it stands under the root warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-file-")
  propertyWorld(root)
  standing(root, CODE_AT, "code\n")
  expect(pathsOf(warrantsAt(root, `./${CODE_AT}`))).toEqual([])
})
