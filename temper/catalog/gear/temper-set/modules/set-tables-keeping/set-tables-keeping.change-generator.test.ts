import { expect, test } from "bun:test"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { SETS_ROWS_AT } from "akasha/temper/catalog/gear/temper-set/modules/set-rows-writing/set-rows-writing.module.code.ts"
import {
  couldTurn,
  generateChange,
  type Reader,
  setTablesOver,
  TABLES_AT,
  writtenOver,
} from "akasha/temper/catalog/gear/temper-set/modules/set-tables-keeping/set-tables-keeping.change-generator.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { temperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.ts"

const UNREAD = { root: "/nowhere", before: () => null, after: () => null }

const SET_PAGES = "temper/catalog/gear/temper-set/pages"

const BYTES = new TextEncoder()

const NONE = `${temperSetCategory.slug}/none`

const NOWHERE = `${temperSetCategory.slug}/nowhere`

const FIRST_PARTS = [".bonuses.jsonl", ".icons.jsonl"]

function setAt(slug: string): string {
  return `${SET_PAGES}/${slug}/${slug}.temper-set.ts`
}

function setValue(slug: string, esoSetId: number, hashPlace: number, category: string): Value {
  return {
    slug,
    title: slug,
    esoSetId,
    hashPlace,
    category,
    valid: ["*"],
    bonuses: "jsonl",
    icons: "jsonl",
  }
}

function readerOf(sets: ReadonlyMap<string, Value>): Reader {
  const categories = new Map<string, Value>([
    [
      "temper/catalog/gear/temper-set-category/pages/none/none.temper-set-category.ts",
      { slug: "none", key: "none" },
    ],
  ])
  return {
    pagesOf: (pageTypeSlug) => {
      if (pageTypeSlug === temperSet.slug) return sets
      if (pageTypeSlug === temperSetCategory.slug) return categories
      return new Map()
    },
    bodyAt: (at) => (FIRST_PARTS.some((ending) => at.endsWith(ending)) ? "" : null),
  }
}

const TWO_SETS = readerOf(
  new Map([
    [setAt("placed-second"), setValue("placed-second", 5, 1, NONE)],
    [setAt("placed-first"), setValue("placed-first", 9, 0, NONE)],
  ])
)

function tablesOf(reader: Reader): ReadonlyMap<string, string> {
  const made = setTablesOver(reader)
  if ("refused" in made) throw new Error(made.refused)
  return new Map(made.tables)
}

function changeHolding(held: ReadonlyMap<string, string>): Change {
  return {
    ...UNREAD,
    changed: [setAt("placed-first")],
    after: (path) => {
      const body = held.get(path)
      return body === undefined ? null : BYTES.encode(body)
    },
  }
}

function unformatted(_at: string, body: string): string {
  return body
}

test("a change moving a set page could turn the tables", () => {
  expect(couldTurn({ ...UNREAD, changed: [setAt("gorethief")] })).toBe(true)
})

test("a change moving the bonuses beside a set page could turn the tables", () => {
  const at = `${SET_PAGES}/gorethief/gorethief.temper-set.bonuses.jsonl`
  expect(couldTurn({ ...UNREAD, changed: [at] })).toBe(true)
})

test("a change moving a page a set names by its key could turn the tables", () => {
  const at = "temper/catalog/skill/temper-class/pages/warden/warden.temper-class.ts"
  expect(couldTurn({ ...UNREAD, changed: [at] })).toBe(true)
})

test("a hand edit to any set table could turn the tables", () => {
  for (const at of TABLES_AT) expect(couldTurn({ ...UNREAD, changed: [at] })).toBe(true)
})

test("a change touching no set page and no set table writes nothing", () => {
  const written = generateChange({ ...UNREAD, changed: ["alan/notes/today.md"] })
  expect(written).toEqual({ edits: [], said: [] })
})

test("every table no longer holding what the set pages say is written again", () => {
  const stale = new Map(TABLES_AT.map((at) => [at, "stale\n"] as const))
  const written = writtenOver(changeHolding(stale), TWO_SETS, unformatted)
  expect(written.edits.map((one) => one.path).sort()).toEqual([...TABLES_AT].sort())
})

test("a table the change leaves absent is added", () => {
  const written = writtenOver(changeHolding(new Map()), TWO_SETS, unformatted)
  expect(written.edits.every((one) => one.kind === "add")).toBe(true)
})

test("the set rows are written in the order the set pages' hash places state", () => {
  const written = writtenOver(changeHolding(new Map()), TWO_SETS, unformatted)
  const rows = written.edits.find((one) => one.path === SETS_ROWS_AT)
  const body = rows?.kind === "add" ? rows.content : ""
  expect(body.indexOf('"id":"placed-first"')).toBeGreaterThan(-1)
  expect(body.indexOf('"id":"placed-first"')).toBeLessThan(body.indexOf('"id":"placed-second"'))
})

test("a table already holding what the set pages say, once formatted, is left alone", () => {
  const formatting = (_at: string, body: string): string => `${body}// formatted\n`
  const level = new Map<string, string>(
    [...tablesOf(TWO_SETS)].map(([at, body]) => [at, formatting(at, body)])
  )
  const written = writtenOver(changeHolding(level), TWO_SETS, formatting)
  expect(written).toEqual({ edits: [], said: [] })
})

test("a set page naming a page that states no key refuses the landing", () => {
  const reader = readerOf(new Map([[setAt("unkeyed"), setValue("unkeyed", 3, 0, NOWHERE)]]))
  const written = writtenOver(changeHolding(new Map()), reader, unformatted)
  expect(written.edits).toEqual([])
  expect(written.refused?.join("\n")).toContain(NOWHERE)
})

test("a set page whose bonuses file is missing refuses the landing", () => {
  const reader: Reader = { ...TWO_SETS, bodyAt: () => null }
  const written = writtenOver(changeHolding(new Map()), reader, unformatted)
  expect(written.edits).toEqual([])
  expect(written.refused?.length).toBe(1)
})
