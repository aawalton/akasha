import { expect, test } from "bun:test"
import { checkNaming, nameOf } from "../name/name.ts"
import { checkQuery, type Page, runQuery } from "../query/query.ts"
import { declarationOf, extendingIn, pageAt, pagesOf, type Unread } from "./store.ts"

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

test("what a page type extends is answered as that page type states it", () => {
  const extending = extendingIn(ROOT)
  expect(extending.get("command")).toBe("domain")
  expect(extending.get("seat")).toBe("agent")
})

test("a page type extending none is not answered as extending anything", () => {
  expect(extendingIn(ROOT).has("page")).toBe(false)
})

test("a query expanding a page type asks about exactly the page types whose chain reaches it", () => {
  const extending = extendingIn(ROOT)
  const checked = checkQuery({ pageType: "domain", expands: true }, seat(), extending)
  if (!checked.ok) throw new Error(checked.message)

  const reaches = (slug: string): boolean => {
    const walked = new Set<string>()
    let at: string | undefined = slug
    while (at !== undefined && !walked.has(at)) {
      if (at === "domain") return true
      walked.add(at)
      at = extending.get(at)
    }
    return false
  }

  const asked = new Set(checked.pageTypes)
  expect(checked.pageTypes[0]).toBe("domain")
  expect(asked.size).toBe(checked.pageTypes.length)
  for (const slug of asked) expect(slug === "domain" || reaches(slug)).toBe(true)
  for (const slug of extending.keys()) expect(asked.has(slug)).toBe(reaches(slug))
})

test("the pages of a page type beneath arrive only where the query expands", () => {
  const extending = extendingIn(ROOT)
  const wide = checkQuery({ pageType: "domain", expands: true }, seat(), extending)
  const narrow = checkQuery({ pageType: "domain" }, seat(), extending)
  if (!wide.ok || !narrow.ok) throw new Error("refused")

  expect(narrow.pageTypes).toEqual(["domain"])
  expect(wide.pageTypes).toContain("command")
  expect(pagesOf(ROOT, "command").length).toBeGreaterThan(0)
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
