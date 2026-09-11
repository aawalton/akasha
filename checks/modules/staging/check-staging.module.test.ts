import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  bodied,
  change,
  named,
  scratch,
  staged,
} from "akasha/checks/modules/staging/check-staging.module.code.ts"
import { SCRATCH_AT } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { importEdge } from "akasha/graph/edges/pages/import-edge.graph-edge.ts"
import { indexImport } from "akasha/pages/indexes/import/index-import.index.ts"
import {
  importersOf,
  indexThere,
  listedAt,
  readingIn,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"

afterAll(scratch.sweep)

const IMPORTER_AT = "akasha/importer.module.code.ts"

const IMPORTED_AT = "akasha/imported.module.code.ts"

const PAGE_AT = "akasha/held/held.module.ts"

const GONE_AT = "akasha/gone.module.code.ts"

const GIT_HEAD = ".git/HEAD"

const IMPORTING = 'import { held } from "./imported.module.code.ts"\n'

const HELD = "export const held = 1\n"

const CARRIED = "export const held = 2\n"

const HANDED = "export const held = 3\n"

const TYPE = "module"

const SLUG = "held"

const ID = "01a08e16-827d-7f4d-bb26-5724ed027609"

const GRAPHED = [importEdge, indexImport]

function said(bytes: Uint8Array | null): string | null {
  if (bytes === null) return null
  return new TextDecoder().decode(bytes)
}

test("the checkout sits where the scratch world puts it", () => {
  expect(staged({}).startsWith(`${SCRATCH_AT}/`)).toBe(true)
})

test("every body the checkout is asked for is written where its path says", () => {
  const root = staged({ [IMPORTER_AT]: IMPORTING, [IMPORTED_AT]: HELD })
  expect(readFileSync(join(root, IMPORTER_AT), "utf8")).toBe(IMPORTING)
  expect(readFileSync(join(root, IMPORTED_AT), "utf8")).toBe(HELD)
})

test("what a body the checkout is asked for imports is filed in the import index", () => {
  const root = staged({ [IMPORTER_AT]: IMPORTING, [IMPORTED_AT]: HELD })
  expect(importersOf(IMPORTED_AT, readingIn(root))).toEqual([IMPORTER_AT])
  expect(importersOf(IMPORTER_AT, readingIn(root))).toEqual([])
})

test("the pages the import index and its edge are sit in the checkout too", () => {
  const root = staged({})
  for (const one of GRAPHED) {
    const [listed] = listedAt(root, one.type, one.slug)
    if (listed === undefined) throw new Error(`\`${one.slug}\` is named by nothing there`)
    expect(listed.id).toBe(one.id)
    expect(readFileSync(join(root, listed.path), "utf8")).toBe(bodied(one))
  }
})

test("a page named in the checkout is answered under its page type and slug", () => {
  const root = staged({ [PAGE_AT]: HELD })
  named(root, PAGE_AT, TYPE, SLUG, ID)
  expect(listedAt(root, TYPE, SLUG)).toEqual([{ path: PAGE_AT, id: ID }])
})

test("a change over the checkout reads what it carries before all else", () => {
  const root = staged({ [IMPORTED_AT]: HELD })
  const over = change(root, { [IMPORTED_AT]: CARRIED }, { [IMPORTED_AT]: HANDED })
  expect(said(over.after(IMPORTED_AT))).toBe(CARRIED)
})

test("a change over the checkout reads what it was handed before the disk", () => {
  const root = staged({ [IMPORTED_AT]: HELD, [PAGE_AT]: HELD })
  const over = change(root, {}, { [IMPORTED_AT]: HANDED })
  expect(said(over.after(IMPORTED_AT))).toBe(HANDED)
  expect(said(over.after(PAGE_AT))).toBe(HELD)
  expect(over.after(GONE_AT)).toBeNull()
})

test("what a change was before is what it was handed and then the disk", () => {
  const root = staged({ [IMPORTED_AT]: HELD })
  const over = change(root, { [IMPORTED_AT]: CARRIED }, { [PAGE_AT]: HANDED })
  expect(said(over.before(IMPORTED_AT))).toBe(HELD)
  expect(said(over.before(PAGE_AT))).toBe(HANDED)
  expect(over.before(GONE_AT)).toBeNull()
})

test("a path the change carries as gone reads as nothing after and as the disk before", () => {
  const root = staged({ [IMPORTED_AT]: HELD })
  const over = change(root, { [IMPORTED_AT]: null })
  expect(over.after(IMPORTED_AT)).toBeNull()
  expect(said(over.before(IMPORTED_AT))).toBe(HELD)
  expect(over.changed).toEqual([IMPORTED_AT])
})

test("no git tree is made in the checkout", () => {
  const root = staged({})
  expect(existsSync(join(root, GIT_HEAD))).toBe(false)
  expect(indexThere(root)).toBe(true)
})
