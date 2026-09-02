import { expect, test } from "bun:test"
import type { Listed } from "@akasha/indexes"
import type { Shaped } from "@akasha/indexes/reaching"
import {
  addressingIn,
  besideRenamed,
  readdressed,
  rebound,
  renamingFor,
  respelled,
  restated,
  statedIn,
  unrepointedIn,
  unrepointedSaid,
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

const HELD: readonly Listed[] = [{ path: AT, id: AAAA }]

const KNOWN: Shaped = {
  targetOf: (propertySlug) => (propertySlug === "names" ? "thing" : null),
  admitting: () => ["thing"],
  at: (pageTypeSlug, slug) => (pageTypeSlug === "thing" && slug === "held" ? HELD : []),
  byId: (id) => (id === AAAA ? (HELD[0] ?? null) : null),
  fieldsOf: () => [],
  slugOfKeyIn: (_value, key) => (key === "names" ? "names" : null),
  fieldOfKey: (_propertySlug, key) => (key === "names" ? "names" : null),
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

test("a value named for the old slug beside a renamed page is renamed too", () => {
  const code = "export const held = 1\nexport const heldTwice = held + held\n"
  expect(rebound(AT, code, "held", "renamed")).toBe(
    "export const renamed = 1\nexport const heldTwice = renamed + renamed\n"
  )
  const imported = 'import { held } from "./held.thing.code.ts"\nexport const it = held\n'
  expect(rebound(AT, imported, "held", "renamed")).toContain("import { renamed } from")
})

test("a rename reaches an identifier and never a string that reads like one", () => {
  const code = 'export const held = "held"\n'
  expect(rebound(AT, code, "held", "renamed")).toBe('export const renamed = "held"\n')
  expect(rebound(AT, code, "held", "held")).toBe(code)
  expect(rebound(AT, "export const other = 1\n", "held", "renamed")).toBe(
    "export const other = 1\n"
  )
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

const ONE = { id: AAAA, was: "held", now: "renamed", pageTypeSlug: "thing" }

const NOTHING: ReadonlyMap<string, string> = new Map()

test("a spelling the rename left behind is answered with where that spelling sits", () => {
  const bodies = new Map([[AT, 'export const THE = "held"\n']])
  const paths = [AT, "akasha/one/other.thing.ts"]
  const said = unrepointedIn(
    [ONE],
    NOTHING,
    () => paths,
    [],
    (path) => bodies.get(path) ?? null
  )
  expect(said[0]?.spellings).toEqual([
    { path: AT, line: null },
    { path: AT, line: 1 },
  ])
  expect(
    unrepointedIn(
      [],
      NOTHING,
      () => paths,
      [],
      () => null
    )
  ).toEqual([])
})

test("what a body the move rewrote spells is read from what the move would leave", () => {
  const at = "akasha/one/other.thing.ts"
  const body = new TextEncoder().encode("export const it = 1\n")
  const said = unrepointedIn(
    [ONE],
    NOTHING,
    () => [at],
    [{ path: at, body }],
    () => 'x = "held"'
  )
  expect(said[0]?.spellings).toEqual([])
})

test("a rename names what it left unrepointed rather than refusing the move", () => {
  const spellings = [
    { path: AT, line: null },
    { path: AT, line: 4 },
  ]
  const one = { renaming: ONE, spellings }
  expect(unrepointedSaid([one], false)).toEqual([
    "2 places still spell the old slug `held` and went unrepointed — read each and judge it",
    `  ${AT} — the path itself`,
    `  ${AT}:4`,
  ])
  expect(unrepointedSaid([{ renaming: ONE, spellings: [] }], true)).toEqual([
    "nothing else spells the old slug `held`",
  ])
})
