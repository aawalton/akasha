import { expect, test } from "bun:test"
import type { Standing } from "../../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Shaped } from "../../../../pages-system/indexes/reaching/reaching.module.code.ts"
import {
  addressingIn,
  besideRenamed,
  readdressed,
  renamingFor,
  respelled,
  restated,
  statedIn,
} from "./move-renaming.module.code.ts"

const AT = "akasha/one/held.thing.ts"

const AAAA = "01a04bed-1450-7000-8000-00000000aaaa"

const PAGE = `export const held = {
  id: "${AAAA}",
  pageTypeSlug: "thing",
  slug: "held",
}
`

const NAMER = { id: "01a04bed-1450-7000-8000-00000000eeee", names: ["thing/held", "held"] }

const HELD: readonly Standing[] = [{ path: AT, id: AAAA }]

const KNOWN: Shaped = {
  targetOf: (propertySlug) => (propertySlug === "names" ? "thing" : null),
  admitting: () => ["thing"],
  at: (pageTypeSlug, slug) => (pageTypeSlug === "thing" && slug === "held" ? HELD : []),
  byId: (id) => (id === AAAA ? (HELD[0] ?? null) : null),
  fieldsOf: () => [],
  slugOfKey: (key) => (key === "names" ? "names" : null),
}

function renaming(from: string, to: string): string {
  const said = renamingFor(from, to, AAAA)
  return "refused" in said ? said.refused : said.renaming.now
}

test("a rename is the stem changing under one tail", () => {
  expect(renaming(AT, "akasha/one/renamed.thing.ts")).toBe("renamed")
  expect(renaming(AT, "akasha/one/held.other.ts")).toContain("under the name it already has")
  expect(renaming("akasha/thing.page-type.ts", "akasha/other.page-type.ts")).toContain(
    "a page type's slug is not renamed here"
  )
})

test("a file standing beside a renamed page is renamed with it", () => {
  const one = { id: AAAA, was: "held", now: "renamed", pageTypeSlug: "thing" }
  expect(besideRenamed("held.thing.code.ts", one)).toBe("renamed.thing.code.ts")
  expect(besideRenamed("held.thing.uncommitted.ts", one)).toBe("renamed.thing.uncommitted.ts")
  expect(besideRenamed("other.thing.code.ts", one)).toBe("other.thing.code.ts")
})

test("a page states its slug once, and the value it is bound to is named for it", () => {
  expect(statedIn(AT, "export const it = 1\n")).toBeNull()
  const now = restated(AT, PAGE, "held-again")
  expect(now).toContain("export const heldAgain = {")
  expect(now).toContain('slug: "held-again"')
  expect(now).toContain(`id: "${AAAA}"`)
  expect(restated(AT, "export const it = 1\n", "other")).toBeNull()
})

test("an address is rewritten in the form it was written in", () => {
  expect(readdressed("thing/held", "renamed")).toBe("thing/renamed")
  expect(readdressed("held", "renamed")).toBe("renamed")
  expect(readdressed(AAAA, "renamed")).toBeNull()
})

test("the ways a page addresses one page are read from that page's own value", () => {
  expect([...addressingIn(NAMER, KNOWN, AAAA)].sort()).toEqual(["held", "thing/held"])
  expect(addressingIn(NAMER, KNOWN, "01a04bed-1450-7000-8000-00000000dddd")).toEqual([])
  expect(addressingIn({ id: AAAA, slug: "held" }, KNOWN, AAAA)).toEqual([])
})

test("only the quoted text an address was written as is written back", () => {
  const said = new Map([["thing/held", "thing/renamed"]])
  const body = 'export const it = { names: ["thing/held"], definition: "thing/held is not" }\n'
  expect(respelled(AT, body, said)).toBe(
    'export const it = { names: ["thing/renamed"], definition: "thing/held is not" }\n'
  )
  expect(respelled(AT, body, new Map())).toBe(body)
})
