import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { generatedAt } from "@akasha/indexes/property-carrying"
import {
  idFiled,
  listedFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "@akasha/indexes/testing"
import type { Value } from "@akasha/pages/page-value"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { fileItself, ITSELF } from "./file-itself.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PATH = "akasha/thing/thing.module.ts"

const FILE_PROPERTY = "file-property"

const PAGE_TYPE = "page-type"

const WORKSPACE = "workspace"

const LOCKFILE = "bun.lock"

const PROPERTY_AT = "akasha/lockfile.file-property.ts"

const PROPERTY_ID = "01a06d4d-0000-7000-8000-00000000000a"

const TYPE_AT = "akasha/workspace.page-type.ts"

const TYPE_ID = "01a06d4d-0000-7000-8000-00000000000b"

const OWNER_AT = "one.workspace.ts"

const OWNER_ID = "01a06d4d-0000-7000-8000-00000000000c"

const ELSEWHERE = "node_modules/one/bun.lock"

function seeded(value: Value): string {
  const root = scratch.rootFor("akasha-file-itself-")
  listedFiled(root, FILE_PROPERTY, "lockfile", [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  idFiled(root, PROPERTY_ID, [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  schemaFiled(root, FILE_PROPERTY, "lockfile", [
    {
      pageTypeSlug: FILE_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: "lockfile",
      propertySlug: "lockfile",
      fileName: LOCKFILE,
    },
  ])
  valueAlsoFiled(root, FILE_PROPERTY, [
    {
      path: PROPERTY_AT,
      value: { id: PROPERTY_ID, pageTypeSlug: FILE_PROPERTY, slug: "lockfile", ...value },
    },
  ])
  listedFiled(root, PAGE_TYPE, WORKSPACE, [{ path: TYPE_AT, id: TYPE_ID }])
  valueAlsoFiled(root, PAGE_TYPE, [
    { path: TYPE_AT, value: { id: TYPE_ID, pageTypeSlug: PAGE_TYPE, slug: WORKSPACE } },
  ])
  idFiled(root, TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  listedFiled(root, WORKSPACE, "one", [{ path: OWNER_AT, id: OWNER_ID }])
  valueAlsoFiled(root, WORKSPACE, [
    { path: OWNER_AT, value: { id: OWNER_ID, pageTypeSlug: WORKSPACE, slug: "one" } },
  ])
  relationFiled(root, PROPERTY_ID, "page-property", TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  writing(root, OWNER_AT, "one\n")
  writing(root, LOCKFILE, "one\n")
  writing(root, ELSEWHERE, "one\n")
  writing(root, "package.json", "{}\n")
  return root
}

function written(): string {
  return seeded({ fileName: LOCKFILE, generated: true })
}

test("a file warrants itself, by the body it holds", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  const oid = writing(root, PATH, "one\n")
  expect(fileItself(root, PATH)).toEqual([{ path: PATH, oid, owed: ITSELF }])
})

test("a file not yet written warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  expect(fileItself(root, "akasha/thing/new.module.ts")).toEqual([])
})

test("a directory at the path warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  mkdirSync(join(root, "akasha/thing"), { recursive: true })
  expect(fileItself(root, "akasha/thing")).toEqual([])
})

test("the body warranted is the body on disk, not the one read before", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  writing(root, PATH, "one\n")
  const oid = writing(root, PATH, "two\n")
  expect(fileItself(root, PATH)[0]?.oid).toBe(oid)
})

test("a warrant carries why the reading is owed", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  writing(root, PATH, "one\n")
  expect(fileItself(root, PATH)[0]?.owed).toBe(ITSELF)
})

test("a file a machine writes, beside the page owning the property, warrants nothing", () => {
  const root = written()
  expect(generatedAt(root, LOCKFILE)).toBe(true)
  expect(fileItself(root, LOCKFILE)).toEqual([])
})

test("a file of the same name in another folder warrants itself", () => {
  const root = written()
  expect(generatedAt(root, ELSEWHERE)).toBe(false)
  expect(fileItself(root, ELSEWHERE)).toEqual([
    { path: ELSEWHERE, oid: writing(root, ELSEWHERE, "one\n"), owed: ITSELF },
  ])
})

test("a file beside the owning page that no property names warrants itself", () => {
  const root = written()
  expect(generatedAt(root, "package.json")).toBe(false)
  expect(fileItself(root, "package.json")).toHaveLength(1)
})

test("a property saying nothing of a machine leaves the file it names warranting itself", () => {
  const root = seeded({ fileName: LOCKFILE })
  expect(generatedAt(root, LOCKFILE)).toBe(false)
  expect(fileItself(root, LOCKFILE)).toHaveLength(1)
})

test("a property saying an author writes it leaves the file it names warranting itself", () => {
  const root = seeded({ fileName: LOCKFILE, generated: false })
  expect(generatedAt(root, LOCKFILE)).toBe(false)
  expect(fileItself(root, LOCKFILE)).toHaveLength(1)
})

test("a property naming no file leaves every file warranting itself", () => {
  const root = seeded({ generated: true })
  expect(generatedAt(root, LOCKFILE)).toBe(false)
  expect(fileItself(root, LOCKFILE)).toHaveLength(1)
})

test("where the index cannot answer, no file is beside the property naming it", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  expect(generatedAt(root, LOCKFILE)).toBe(false)
})

test("where the index cannot answer, a file still warrants itself", () => {
  const root = scratch.rootFor("akasha-file-itself-")
  const oid = writing(root, LOCKFILE, "one\n")
  expect(fileItself(root, LOCKFILE)).toEqual([{ path: LOCKFILE, oid, owed: ITSELF }])
})
