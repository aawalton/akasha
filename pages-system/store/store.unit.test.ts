import { expect, test } from "bun:test"
import { checkNaming, nameOf } from "../name/name.ts"
import { checkQuery, type Page, runQuery } from "../query/query.ts"
import type { Repo } from "./address.ts"
import { declarationOf, extendingIn } from "./declared.ts"
import { holdingsOf, pageAt, pagesFor, pagesOf, type Unread } from "./store.ts"

const ROOT = `${import.meta.dir}/../..`

const REPO: Repo = { repo: "akasha", root: ROOT }

const NOW = 0

const seat = () => {
  const declared = declarationOf(ROOT, "seat")
  if (declared === null) throw new Error("no seat page type stands under the root")
  return declared
}

test("the pages of a page type beneath arrive only where the query expands", () => {
  const extending = extendingIn(ROOT)
  const wide = checkQuery({ pageType: "domain", expands: true }, seat(), extending)
  const narrow = checkQuery({ pageType: "domain" }, seat(), extending)
  if (!wide.ok || !narrow.ok) throw new Error("refused")

  expect(narrow.pageTypes).toEqual(["domain"])
  expect(wide.pageTypes).toContain("command")
  expect(pagesOf(REPO, "command").length).toBeGreaterThan(0)
})

test("every page of a page type is found by the name of its own file", () => {
  const found = pagesOf(REPO, "seat")
  expect(found.length).toBeGreaterThan(0)
  for (const at of found) expect(at.endsWith(".seat.md")).toBe(true)
})

test("a page type whose pages are rows names the page type holding them and the key", () => {
  const held = holdingsOf(ROOT, "log-line")
  expect(held.holdings).toContainEqual({ on: "log-day", key: "lines" })
})

test("a page type whose pages are files is held by nothing", () => {
  expect(holdingsOf(ROOT, "seat").holdings).toEqual([])
})

test("a page type may stand as rows of more than one page type", () => {
  const held = holdingsOf(ROOT, "reference")
  expect(held.holdings.length).toBeGreaterThan(1)
  for (const one of held.holdings) expect(one.key).toBe("references")
})

test("a slug naming no page type is held by nothing", () => {
  expect(holdingsOf(ROOT, "no-page-type-is-spelt-this-way").holdings).toEqual([])
})

test("every holding of a page type names a page type and a key", () => {
  for (const one of holdingsOf(ROOT, "reference").holdings) {
    expect(one.on.length).toBeGreaterThan(0)
    expect(one.key.length).toBeGreaterThan(0)
  }
})

test("no rows spelling in this repository is beyond what the store reads", () => {
  expect(holdingsOf(ROOT, "log-line").beyond).toEqual({})
})

test("a page type whose pages are rows answers none of them, nothing here reading a sidecar", () => {
  expect(pagesOf(REPO, "session-tracking")).toEqual([])
})

test("every page type asked for at once is answered the pages named for it and no other", () => {
  const many = pagesFor(REPO, ["seat", "command", "domain"])
  for (const slug of ["seat", "command", "domain"]) {
    const found = many.get(slug)
    if (found === undefined) throw new Error(`no answer for ${slug}`)
    expect(found.length).toBeGreaterThan(0)
    for (const at of found) expect(at.endsWith(`.${slug}.md`)).toBe(true)
  }
})

test("a page type standing with no page of its own is answered nothing, never left out", () => {
  const many = pagesFor(REPO, ["seat", "session-tracking"])
  expect(many.has("session-tracking")).toBe(true)
  expect(many.get("session-tracking")).toEqual([])
  expect(many.get("seat")?.length).toBeGreaterThan(0)
})

test("a slug naming no page type is answered no pages, a file being a page by its own name", () => {
  const many = pagesFor(REPO, ["no-page-type-is-spelt-this-way"])
  expect(many.has("no-page-type-is-spelt-this-way")).toBe(true)
  expect(many.get("no-page-type-is-spelt-this-way")).toEqual([])
})

test("what is asked for is walked once, so a generator is answered in full", () => {
  const asking = function* () {
    yield "seat"
    yield "command"
  }
  expect([...pagesFor(REPO, asking()).keys()].sort()).toEqual(["command", "seat"])
})

test("a page holds what it states, under the type its page type declares", () => {
  const declared = seat()
  const at = pagesOf(REPO, "seat")[0]
  if (at === undefined) throw new Error("no seat page stands")
  const read = pageAt(REPO, at, declared, NOW)
  if ("unread" in read) throw new Error(read.unread)
  expect(read.at).toBe(at)
  expect(read.values.properties["id"]?.kind).toBe("text")
  expect(read.values.properties["on-call"]?.kind).toBe("boolean")
})

test("a key the page type declares and the page states nothing under holds nothing", () => {
  const declared = seat()
  const at = pagesOf(REPO, "seat")[0]
  if (at === undefined) throw new Error("no seat page stands")
  const read = pageAt(REPO, at, declared, NOW)
  if ("unread" in read) throw new Error(read.unread)
  expect(read.values.properties["cover"]).toEqual({ kind: "absent" })
})

test("every address a store issues names the repository it was read from", () => {
  const found = pagesOf(REPO, "seat")
  expect(found.length).toBeGreaterThan(0)
  for (const at of found) expect(at.startsWith("akasha:")).toBe(true)
})

test("an address naming no page answers why it could not be read, rather than empty values", () => {
  const read = pageAt(REPO, "akasha:agent/seat/nobody-sits-here.seat.md", seat(), NOW)
  expect("unread" in read).toBe(true)
})

test("a path with no repository in front of it is no address of this repository", () => {
  const read = pageAt(REPO, "agent/seat/nobody-sits-here.seat.md", seat(), NOW)
  if (!("unread" in read)) throw new Error("read")
  expect(read.unread).toContain("akasha")
})

test("an address of another repository is not taken against this root", () => {
  const found = pagesOf(REPO, "seat")[0]
  if (found === undefined) throw new Error("no seat page stands")
  const path = found.slice("akasha:".length)
  const read = pageAt(REPO, `code-editor:${path}`, seat(), NOW)
  expect("unread" in read).toBe(true)
})

test("the names of the running seats", () => {
  const declared = seat()
  const checked = checkQuery({ pageType: "seat" }, declared)
  if (!checked.ok) throw new Error(checked.message)

  const read = checked.pageTypes
    .flatMap((one) => pagesOf(REPO, one))
    .map((at) => pageAt(REPO, at, declared, NOW))
  const unread = read.filter((one): one is Unread => "unread" in one)
  expect(unread).toEqual([])

  const naming = checkNaming(declared.properties)
  if (!naming.ok) throw new Error(naming.message)

  const pages = read.filter((one): one is Page => !("unread" in one))
  const found = runQuery(checked, pages)
  const names = found.map((page) => nameOf(naming, page.values))
  expect(names.length).toBe(pagesOf(REPO, "seat").length)
  for (const name of names) expect(typeof name).toBe("string")
})
