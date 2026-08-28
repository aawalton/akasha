import { expect, test } from "bun:test"
import { checkNaming, nameOf } from "../name/name.ts"
import { checkQuery, type Page, runQuery } from "../query/query.ts"
import { declarationOf, pageAt, pagesOf, type Unread } from "./store.ts"

/**
 * The repository this store is read over. A store reads a repository, so what it is tested against
 * is one, and this one is the one standing under the file being tested.
 */
const ROOT = `${import.meta.dir}/../..`

/** The moment every page in a pass is read at. A store holds no clock, so a test states one. */
const NOW = 0

const seat = () => {
  const declared = declarationOf(ROOT, "seat")
  if (declared === null) throw new Error("no seat page type stands under the root")
  return declared
}

test("a slug naming no page type declares nothing", () => {
  expect(declarationOf(ROOT, "no-page-type-is-spelt-this-way")).toBeNull()
})

test("a page type declares the keys of every page type it extends, as well as its own", () => {
  const declared = seat()
  expect(declared.properties["errand"]?.type).toEqual({ kind: "text" })
  expect(declared.properties["id"]?.type).toEqual({ kind: "text" })
  expect(declared.properties["on-call"]?.type).toEqual({ kind: "boolean" })
})

test("a key declared to hold what no formula holds is carried under what it holds", () => {
  const declared = seat()
  expect(declared.properties["turn-end-decisions"]).toBeUndefined()
  expect(declared.beyond["turn-end-decisions"]).toBe("pages")
})

test("a query naming a key beyond the language is refused by what the store declared", () => {
  const answer = checkQuery({ pageType: "seat", where: "{turn-end-decisions}" }, seat())
  if (answer.ok) throw new Error("checked")
  expect(answer.message).toContain("which no formula holds")
})

test("every page of a page type is found by the name of its own file", () => {
  const found = pagesOf(ROOT, "seat")
  expect(found.length).toBeGreaterThan(0)
  for (const at of found) expect(at.endsWith(".seat.md")).toBe(true)
})

test("a page type whose pages are rows answers none of them, nothing here reading a sidecar", () => {
  expect(pagesOf(ROOT, "session-tracking")).toEqual([])
})

test("a page holds what it states, under the type its page type declares", () => {
  const declared = seat()
  const at = pagesOf(ROOT, "seat")[0]
  if (at === undefined) throw new Error("no seat page stands")
  const read = pageAt(ROOT, at, declared, NOW)
  if ("unread" in read) throw new Error(read.unread)
  expect(read.at).toBe(at)
  expect(read.values.properties["id"]?.kind).toBe("text")
  expect(read.values.properties["on-call"]?.kind).toBe("boolean")
})

test("a key the page type declares and the page states nothing under holds nothing", () => {
  const declared = seat()
  const at = pagesOf(ROOT, "seat")[0]
  if (at === undefined) throw new Error("no seat page stands")
  const read = pageAt(ROOT, at, declared, NOW)
  if ("unread" in read) throw new Error(read.unread)
  expect(read.values.properties["cover"]).toEqual({ kind: "absent" })
})

test("an address naming no page answers why it could not be read, rather than empty values", () => {
  const read = pageAt(ROOT, "agent/seat/nobody-sits-here.seat.md", seat(), NOW)
  expect("unread" in read).toBe(true)
})

test("the names of the running seats", () => {
  const declared = seat()
  const checked = checkQuery({ pageType: "seat" }, declared)
  if (!checked.ok) throw new Error(checked.message)

  const read = checked.pageTypes
    .flatMap((one) => pagesOf(ROOT, one))
    .map((at) => pageAt(ROOT, at, declared, NOW))
  const unread = read.filter((one): one is Unread => "unread" in one)
  expect(unread).toEqual([])

  const naming = checkNaming(declared.properties)
  if (!naming.ok) throw new Error(naming.message)

  const pages = read.filter((one): one is Page => !("unread" in one))
  const found = runQuery(checked, pages)
  const names = found.map((page) => nameOf(naming, page.values))
  expect(names.length).toBe(pagesOf(ROOT, "seat").length)
  for (const name of names) expect(typeof name).toBe("string")
})
