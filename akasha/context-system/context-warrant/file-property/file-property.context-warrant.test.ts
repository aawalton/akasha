import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { indexed, pathsOf } from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { knowingIn, unreadIn, type Warrant } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { fileProperty, PROPERTY } from "./file-property.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const PATH = "akasha/thing/thing.module.ts"

let minted = 0

function mintedId(): string {
  minted = minted + 1
  return `01a04bc4-0000-7000-8000-${String(minted).padStart(12, "0")}`
}

function pageType(root: string, slug: string): void {
  const id = mintedId()
  const path = `akasha/${slug}/${slug}.page-type.ts`
  standing(
    root,
    path,
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}" }\n`
  )
  indexed(root, `identity/page-type/slug/${slug}.jsonl`, JSON.stringify({ path, id }))
}

function propertyPage(root: string, slug: string, pageTypeSlug: string): string {
  const id = mintedId()
  const path = `akasha/thing/properties/${slug}.${pageTypeSlug}.ts`
  standing(
    root,
    path,
    `export const held = { id: "${id}", pageTypeSlug: "${pageTypeSlug}", slug: "${slug}" }\n`
  )
  indexed(root, `identity/${pageTypeSlug}/slug/${slug}.jsonl`, JSON.stringify({ path, id }))
  indexed(
    root,
    `schema/page-property/slug/${slug}.jsonl`,
    JSON.stringify({ pageTypeSlug, targetPageTypeSlug: null })
  )
  return path
}

function statingWorld(root: string): readonly string[] {
  pageType(root, "module")
  const id = propertyPage(root, "id", "text-property")
  const pageTypeSlug = propertyPage(root, "page-type-slug", "relation-property")
  const slug = propertyPage(root, "slug", "text-property")
  const definition = propertyPage(root, "definition", "text-property")
  return [definition, id, pageTypeSlug, slug].sort()
}

function stating(root: string, path: string, keys: readonly string[]): string {
  const said = keys.map((one) => `  ${one}: "one",`).join("\n")
  return standing(root, path, `export const thing = {\n${said}\n}\n`)
}

function warrantsAt(root: string, path: string): readonly Warrant[] {
  return fileProperty(root, path, knowingIn(root))
}

test("a page warrants the page defining every property it states", () => {
  const root = scratch.rootFor("akasha-file-property-")
  const every = statingWorld(root)
  stating(root, PATH, ["id", "pageTypeSlug", "slug", "definition"])
  expect(pathsOf(warrantsAt(root, PATH))).toEqual(every)
})

test("a property warrants the body standing at the page defining it", () => {
  const root = scratch.rootFor("akasha-file-property-")
  statingWorld(root)
  stating(root, PATH, ["definition"])
  const held = warrantsAt(root, PATH)[0]
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(PROPERTY)
})

test("a page stating no property warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  statingWorld(root)
  standing(root, PATH, "export const thing = {}\n")
  expect(pathsOf(warrantsAt(root, PATH))).toEqual([])
})

test("a property the type allows and the page does not state warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  pageType(root, "module")
  const definition = propertyPage(root, "definition", "text-property")
  const code = propertyPage(root, "code", "file-property")
  standing(
    root,
    "akasha/module/module.page-type.ts",
    [
      `export const module_ = { id: "${mintedId()}", pageTypeSlug: "page-type", slug: "module",`,
      `  properties: [{ pagePropertySlug: "definition" }, { pagePropertySlug: "code" }] }`,
      "",
    ].join("\n")
  )
  stating(root, PATH, ["definition"])
  expect(pathsOf(warrantsAt(root, PATH))).toEqual([definition])
  expect(pathsOf(warrantsAt(root, PATH))).not.toContain(code)
})

test("a property whose defining page is not there warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-property-")
  const every = statingWorld(root)
  stating(root, PATH, ["id", "pageTypeSlug", "slug", "definition"])
  rmSync(join(root, every[0] ?? ""))
  expect(pathsOf(warrantsAt(root, PATH))).toEqual(every.slice(1))
})

test("a property the index defines nowhere warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  const every = statingWorld(root)
  stating(root, PATH, ["id", "pageTypeSlug", "slug", "definition", "nowhere"])
  expect(pathsOf(warrantsAt(root, PATH))).toEqual(every)
})

test("a property the schema names and the identity index does not warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  pageType(root, "module")
  indexed(
    root,
    "schema/page-property/slug/loose.jsonl",
    JSON.stringify({ pageTypeSlug: "text-property", targetPageTypeSlug: null })
  )
  stating(root, PATH, ["loose"])
  expect(pathsOf(warrantsAt(root, PATH))).toEqual([])
})

test("a cold index warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  stating(root, PATH, ["id", "definition"])
  expect(pathsOf(warrantsAt(root, PATH))).toEqual([])
})

test("a file standing beside a page is no page, and warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  statingWorld(root)
  const beside = "akasha/thing/thing.module.code.ts"
  standing(root, beside, `export const thing = { id: "one", definition: "two" }\n`)
  expect(pathsOf(warrantsAt(root, beside))).toEqual([])
})

test("a file naming no page type in its name warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  statingWorld(root)
  const notes = "akasha/thing/thing.notes.ts"
  standing(root, notes, `export const thing = { id: "one", definition: "two" }\n`)
  expect(pathsOf(warrantsAt(root, notes))).toEqual([])
})

test("a file whose name says no stem and no tail warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  statingWorld(root)
  const loose = "akasha/thing/loose.ts"
  standing(root, loose, `export const loose = { id: "one", definition: "two" }\n`)
  expect(pathsOf(warrantsAt(root, loose))).toEqual([])
})

test("a page whose export is no value it can read warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  statingWorld(root)
  standing(root, PATH, "export const thing = null\n")
  expect(pathsOf(warrantsAt(root, PATH))).toEqual([])
})

test("a page answering to no export named for its slug warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  statingWorld(root)
  standing(root, PATH, `export const other = { id: "one", definition: "two" }\n`)
  expect(pathsOf(warrantsAt(root, PATH))).toEqual([])
})

test("a page that will not load warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-property-")
  statingWorld(root)
  standing(root, PATH, "export const thing = {\n")
  expect(pathsOf(warrantsAt(root, PATH))).toEqual([])
})

test("a page defining a property does not warrant itself for it", () => {
  const root = scratch.rootFor("akasha-file-property-")
  pageType(root, "text-property")
  const path = "akasha/thing/properties/slug.text-property.ts"
  const id = mintedId()
  standing(root, path, `export const slug = { id: "${id}", slug: "slug" }\n`)
  indexed(root, "identity/text-property/slug/slug.jsonl", JSON.stringify({ path, id }))
  indexed(
    root,
    "schema/page-property/slug/slug.jsonl",
    JSON.stringify({ pageTypeSlug: "text-property", targetPageTypeSlug: null })
  )
  expect(pathsOf(warrantsAt(root, path))).toEqual([])
})

test("a property not read is refused, and the refusal says the property is owed", () => {
  const root = scratch.rootFor("akasha-file-property-")
  warrantsStanding(root, ["file-property"])
  const every = statingWorld(root)
  const oid = stating(root, PATH, ["id", "pageTypeSlug", "slug", "definition"])
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(every.length)
  expect(said[0]).toContain(PROPERTY)
})
