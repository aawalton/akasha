import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { schemaFiled } from "@akasha/indexes/testing"
import {
  knowingIn,
  unreadIn,
  type Warrant,
} from "../../modules/warranting/warranting.module.code.ts"
import {
  pageTypeListed,
  pathsOf,
  warrantsSeeded,
} from "../../modules/warranting/warranting.module.test-fixtures.ts"
import { filePageType, TYPE } from "./file-page-type.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const PATH = "akasha/thing/thing.module.ts"

function typeWorld(root: string): readonly string[] {
  const page = pageTypeListed(root, "page", null)
  const domain = pageTypeListed(root, "domain", "page")
  const module = pageTypeListed(root, "module", "domain")
  return [module, domain, page]
}

function warrantsAt(root: string, path: string): readonly Warrant[] {
  return filePageType(root, path, knowingIn(root))
}

test("a page warrants its type, and every type that one extends", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  const chain = typeWorld(root)
  writing(root, PATH, "one\n")
  expect(pathsOf(warrantsAt(root, PATH))).toEqual(chain)
})

test("a type warrants the body standing at the type's page", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  typeWorld(root)
  writing(root, PATH, "one\n")
  const held = warrantsAt(root, PATH)[0]
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(TYPE)
})

test("a file standing beside a page warrants no type of its own", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  typeWorld(root)
  schemaFiled(root, "file-property", "code", [
    { pageTypeSlug: "file-property", targetPageTypeSlug: null, slug: "code" },
  ])
  const beside = "akasha/thing/thing.module.code.ts"
  writing(root, beside, "body\n")
  expect(pathsOf(warrantsAt(root, beside))).toEqual([])
})

test("a file named for no page type warrants no type", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  typeWorld(root)
  const beside = "akasha/thing/thing.module.notes.ts"
  writing(root, beside, "body\n")
  expect(pathsOf(warrantsAt(root, beside))).toEqual([])
})

test("a file naming no page type in its name answers to no type", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  typeWorld(root)
  const loose = "akasha/thing/loose.ts"
  writing(root, loose, "body\n")
  expect(pathsOf(warrantsAt(root, loose))).toEqual([])
})

test("a chain that turns back on itself is walked once", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  const one = pageTypeListed(root, "one", "two")
  const two = pageTypeListed(root, "two", "one")
  const at = "akasha/thing/thing.one.ts"
  writing(root, at, "body\n")
  expect(pathsOf(warrantsAt(root, at))).toEqual([one, two])
})

test("a type whose page is not there warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  const chain = typeWorld(root)
  writing(root, PATH, "one\n")
  rmSync(join(root, chain[0] ?? ""))
  expect(pathsOf(warrantsAt(root, PATH))).toEqual([])
})

test("a type not read is refused, and the refusal says the type is owed", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  warrantsSeeded(root)
  typeWorld(root)
  const oid = writing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(3)
  expect(said[0]).toContain(TYPE)
})

test("one reading of a type answers for every path of that type", () => {
  const root = scratch.rootFor("akasha-file-page-type-")
  warrantsSeeded(root)
  const chain = typeWorld(root)
  const other = "akasha/thing/other.module.ts"
  for (const at of [PATH, other]) {
    recordRead(root, AGENT, {
      path: at,
      oid: writing(root, at, "one\n"),
      seenAt: 1,
      mechanicalOid: null,
    })
  }
  expect(unreadIn(root, AGENT, [PATH, other]).length).toBe(chain.length)
})
