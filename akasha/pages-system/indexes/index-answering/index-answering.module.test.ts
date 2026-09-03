import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import {
  carriedIn,
  declarationsOf,
  pageAt,
  propertiesOf,
  sourceIn,
} from "@akasha/pages-system/page-type-properties"
import type { Value } from "@akasha/pages-system/page-value"
import { fileKeysAt, pageTypesIn, schemaAt } from "../index-entries/index-entries.module.code.ts"
import {
  everyOfType,
  everyPath,
  idsNaming,
  importersOf,
  listedAt,
  listedById,
  listedByPath,
  listedNamed,
  namersOf,
  readingIn,
  schemaOf,
  typeSlugById,
  typeSlugOf,
} from "../index-reading/index-reading.module.code.ts"
import {
  idFiled,
  importFiled,
  listedFiled,
  pathFiled,
  readingLaidOver,
  relationFiled,
  schemaFiled,
} from "../index-reading/index-reading.module.test-fixtures.ts"
import type { Reading } from "../index-shape/index-shape.module.code.ts"
import { declaringOf } from "../property-carrying/property-carrying.module.code.ts"
import { knownIn } from "../reaching/reaching.module.code.ts"
import { answeringOver } from "./index-answering.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD_AT = "akasha/held/held.module.ts"

const HELD_ID = "01a04a4a-0000-7000-8000-00000000000a"

const TYPE_AT = "akasha/module/module.page-type.ts"

const TYPE_ID = "01a04a4a-0000-7000-8000-00000000000b"

const SLUG_ID = "01a04a4a-0000-7000-8000-00000000000c"

const LAID_AT = "akasha/laid/laid.module.ts"

const LAID_ID = "01a04a4a-0000-7000-8000-00000000000d"

const MODULE = "module"

const PAGE_TYPE = "page-type"

const SLUG = "slug"

const DECLARES = "page-property-slug"

const NOT_THERE = "is not there"

const SCHEMA = {
  pageTypeSlug: "text-property",
  targetPageTypeSlug: null,
  unique: "page-type",
  slug: SLUG,
  propertySlug: SLUG,
  fileName: null,
}

const HELD_VALUE: Value = { id: HELD_ID, pageTypeSlug: MODULE, slug: "held" }

const TYPE_VALUE: Value = {
  id: TYPE_ID,
  pageTypeSlug: PAGE_TYPE,
  slug: MODULE,
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: SLUG, required: true, many: false }],
}

const DOMAIN_AT = "akasha/held/domain.page-type.ts"

const DOMAIN_ID = "01a04a4a-0000-7000-8000-0000000000d0"

// `module` extends `domain`, and the walk reading what a page type carries reads its parent too.
// The parent went unseeded here and the walk used to break quietly on it; it refuses now, so the
// fixture names the page type it always said it extended.
const DOMAIN_VALUE: Value = { id: DOMAIN_ID, pageTypeSlug: PAGE_TYPE, slug: "domain" }

function pageOf(path: string): Value | null {
  if (path === HELD_AT) return HELD_VALUE
  if (path === TYPE_AT) return TYPE_VALUE
  if (path === DOMAIN_AT) return DOMAIN_VALUE
  return null
}

function seeded(): string {
  const root = scratch.rootFor("akasha-index-answering-")
  listedFiled(root, MODULE, "held", [{ path: HELD_AT, id: HELD_ID }])
  listedFiled(root, PAGE_TYPE, MODULE, [{ path: TYPE_AT, id: TYPE_ID }])
  listedFiled(root, PAGE_TYPE, "domain", [{ path: DOMAIN_AT, id: DOMAIN_ID }])
  idFiled(root, HELD_ID, [{ path: HELD_AT, id: HELD_ID }])
  idFiled(root, TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  pathFiled(root, HELD_AT, [{ path: HELD_AT, id: HELD_ID }])
  pathFiled(root, TYPE_AT, [{ path: TYPE_AT, id: TYPE_ID }])
  schemaFiled(root, "text-property", SLUG, [SCHEMA])
  relationFiled(root, TYPE_ID, "extends-slug", HELD_ID, [{ path: HELD_AT, id: HELD_ID }])
  relationFiled(root, SLUG_ID, DECLARES, TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  return root
}

test("every question answers what the reader beneath it answers with the reading bound", () => {
  const root = seeded()
  const reading = readingIn(root)
  const index = answeringOver(reading, root, pageOf)
  expect(index.carriedIn(TYPE_VALUE, MODULE)).toEqual(carriedIn(TYPE_VALUE, reading, MODULE))
  expect(index.declarationsOf(MODULE)).toEqual(declarationsOf(MODULE, reading, pageOf))
  expect(index.declaringOf(SLUG_ID)).toEqual(declaringOf(reading, SLUG_ID))
  expect(index.everyOfType(MODULE)).toEqual(everyOfType(reading, MODULE))
  expect(index.everyPath()).toEqual(everyPath(reading))
  expect(index.fileKeysAt()).toEqual(fileKeysAt(reading))
  expect(index.idsNaming(TYPE_ID, "extends-slug")).toEqual(
    idsNaming(reading, TYPE_ID, "extends-slug")
  )
  expect(index.listedAt(MODULE, "held")).toEqual(listedAt(reading, MODULE, "held"))
  expect(index.listedById(HELD_ID)).toEqual(listedById(reading, HELD_ID))
  expect(index.listedByPath(HELD_AT)).toEqual(listedByPath(reading, HELD_AT))
  expect(index.listedNamed(MODULE, SLUG, "held")).toEqual(
    listedNamed(reading, MODULE, SLUG, "held")
  )
  expect(index.namersOf(TYPE_ID)).toEqual(namersOf(reading, TYPE_ID))
  expect(index.pageAt(MODULE, "held")).toEqual(pageAt(reading, MODULE, "held", pageOf))
  expect(index.pageTypesIn()).toEqual(pageTypesIn(reading))
  expect(index.propertiesOf(MODULE)).toEqual(propertiesOf(MODULE, reading, pageOf))
  expect(index.schemaAt()).toEqual(schemaAt(reading))
  expect(index.schemaOf(SLUG)).toEqual(schemaOf(reading, SLUG))
  expect(index.typeSlugById(HELD_ID)).toEqual(typeSlugById(reading, HELD_ID))
  expect(index.typeSlugOf(HELD_ID)).toEqual(typeSlugOf(reading, HELD_ID))
})

test("a question answered through a shape hands back the shape the reader beneath hands back", () => {
  const root = seeded()
  const reading = readingIn(root)
  const index = answeringOver(reading, root, pageOf)
  expect(index.knownIn().at(MODULE, "held")).toEqual(knownIn(reading, pageOf).at(MODULE, "held"))
  expect(index.sourceIn().schemaFor(SLUG)).toEqual(sourceIn(reading, pageOf).schemaFor(SLUG))
  expect(index.kindsUnder(PAGE_TYPE)).toEqual(kindsUnder(PAGE_TYPE, reading, pageOf))
})

test("what the reader beneath refuses is refused here in the same words", () => {
  const root = seeded()
  const reading = readingIn(root)
  const said = "the index names no commit it was built from"
  expect(() => answeringOver(reading, root, pageOf).importersOf(HELD_AT)).toThrow(said)
  expect(() => importersOf(root, HELD_AT, reading)).toThrow(said)
})

test("a caller filing a change binds no root, so what imports a file is not refused", () => {
  const root = seeded()
  importFiled(root, HELD_AT, [{ path: TYPE_AT }])
  const reading = readingIn(root)

  expect(() => answeringOver(reading, root, pageOf).importersOf(HELD_AT)).toThrow(
    "the index names no commit it was built from"
  )
  expect(answeringOver(reading, null, pageOf).importersOf(HELD_AT)).toEqual([TYPE_AT])
})

test("a question is answered from the reading bound rather than from the index at a root", () => {
  const root = seeded()
  const laid = readingLaidOver(root, {
    "identity/module/slug/laid.jsonl": [{ path: LAID_AT, id: LAID_ID }],
    "path/akasha/laid/laid.module.ts.jsonl": [{ path: LAID_AT, id: LAID_ID }],
  })
  const index = answeringOver(laid, root, pageOf)
  expect(index.listedAt(MODULE, "laid")).toEqual([{ path: LAID_AT, id: LAID_ID }])
  expect(listedAt(root, MODULE, "laid")).toEqual([])
  expect(index.everyPath()).toContain(LAID_AT)
  expect(everyPath(root)).not.toContain(LAID_AT)
})

const COLD: Reading = { holds: () => false, listing: () => [], lines: () => [] }

test("no question falls back to the index at a root, even one handed in for something else", () => {
  const root = seeded()
  const index = answeringOver(COLD, root, pageOf)
  expect(listedAt(root, MODULE, "held")).toHaveLength(1)
  expect(() => index.everyOfType(MODULE)).toThrow(NOT_THERE)
  expect(() => index.everyPath()).toThrow(NOT_THERE)
  expect(() => index.listedAt(MODULE, "held")).toThrow(NOT_THERE)
  expect(() => index.listedById(HELD_ID)).toThrow(NOT_THERE)
  expect(() => index.fileKeysAt()).toThrow(NOT_THERE)
  expect(() => index.kindsUnder(PAGE_TYPE)).toThrow(NOT_THERE)
  expect(() => index.knownIn()).toThrow(NOT_THERE)
})
