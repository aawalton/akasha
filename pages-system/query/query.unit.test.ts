import { expect, test } from "bun:test"
import type { Value, Values } from "../formula/formula.ts"
import type { Extending } from "./expands.ts"
import type { Declaring } from "./keys.ts"
import {
  type Checked,
  checkQuery,
  type Declared,
  type Page,
  type Query,
  runQuery,
} from "./query.ts"

const TEXT = { kind: "text" } as const
const NUMBER = { kind: "number" } as const
const BOOLEAN = { kind: "boolean" } as const
const INSTANT = { kind: "instant" } as const

const declaredOf = (
  extra: Declared["properties"] = {},
  beyond: Record<string, string> = {}
): Declared => ({ properties: { slug: { type: TEXT }, id: { type: TEXT }, ...extra }, beyond })

const pageOf = (at: string, properties: Record<string, Value>): Page => ({
  at,
  values: { now: 0, properties } satisfies Values,
})

const text = (of: string): Value => ({ kind: "text", text: of })
const number = (of: number): Value => ({ kind: "number", number: of })
const boolean = (of: boolean): Value => ({ kind: "boolean", boolean: of })

const checked = (
  query: Query,
  declared: Declared = declaredOf(),
  extending?: Extending,
  declaring?: Declaring
): Checked => {
  const answer = checkQuery(query, declared, extending, declaring)
  if (!answer.ok) throw new Error(`refused: ${answer.message}`)
  return answer
}

const refusalOf = (
  query: Query,
  declared: Declared = declaredOf(),
  extending?: Extending,
  declaring?: Declaring
): string => {
  const answer = checkQuery(query, declared, extending, declaring)
  if (answer.ok) throw new Error("checked")
  return answer.message
}

const extending = (of: Record<string, string>): Extending => new Map(Object.entries(of))

const declaring = (of: Record<string, Declared>): Declaring => new Map(Object.entries(of))

const keysOf = (page: Page | undefined): readonly string[] =>
  Object.keys(page?.values.properties ?? {})

const family = (query: Checked): readonly string[] => [...query.pageTypes].sort()

const at = (pages: readonly Page[]): readonly string[] => pages.map((page) => page.at)

test("a query stating no where asks for every page of its page type", () => {
  const pages = [pageOf("a", { slug: text("a") }), pageOf("b", { slug: text("b") })]
  expect(at(runQuery(checked({ pageType: "seat" }), pages))).toEqual(["a", "b"])
})

test("a checked query carries the page type it names, which is what a store is asked for", () => {
  expect(checked({ pageType: "seat" }).pageTypes).toEqual(["seat"])
})

test("a query that expands asks about the page type it names and every one beneath it", () => {
  const query = checked(
    { pageType: "domain", expands: true },
    declaredOf(),
    extending({ command: "domain", "old-ops-command": "domain", persona: "readout" })
  )
  expect(query.pageTypes[0]).toBe("domain")
  expect(family(query)).toEqual(["command", "domain", "old-ops-command"])
})

test("a page type reaching the one named through another page type is beneath it", () => {
  const query = checked(
    { pageType: "domain", expands: true },
    declaredOf(),
    extending({ readout: "domain", persona: "readout", value: "readout" })
  )
  expect(family(query)).toEqual(["domain", "persona", "readout", "value"])
})

test("a page type beneath is asked about whether or not it extends anything itself", () => {
  const query = checked(
    { pageType: "domain", expands: true },
    declaredOf(),
    extending({ list: "domain" })
  )
  expect(family(query)).toEqual(["domain", "list"])
})

test("a query that does not expand asks about the one page type, page types beneath it or not", () => {
  const query = checked(
    { pageType: "domain" },
    declaredOf(),
    extending({ command: "domain", "old-ops-command": "domain" })
  )
  expect(query.pageTypes).toEqual(["domain"])
})

test("a ring among the page types a query expands into is refused at checking, naming them", () => {
  const answer = checkQuery(
    { pageType: "a", expands: true },
    declaredOf(),
    extending({ a: "b", b: "a" })
  )
  if (answer.ok) throw new Error("checked")
  expect(answer.moment).toBe("checking")
  expect(answer.message).toBe("a cycle among the page types `a`, `b`")
})

test("a page type extending itself is a ring of one", () => {
  expect(refusalOf({ pageType: "a", expands: true }, declaredOf(), extending({ a: "a" }))).toBe(
    "a cycle among the page types `a`"
  )
})

test("a ring no expansion reaches does not refuse the query that cannot reach it", () => {
  const query = checked(
    { pageType: "domain", expands: true },
    declaredOf(),
    extending({ x: "y", y: "x", command: "domain" })
  )
  expect(family(query)).toEqual(["command", "domain"])
})

test("a ring is refused before the where is read, the query being about nothing until it is", () => {
  expect(
    refusalOf({ pageType: "a", expands: true, where: "{slug}" }, declaredOf(), extending({ a: "a" }))
  ).toBe("a cycle among the page types `a`")
})

test("a query that expands with nothing said of what page types extend is refused", () => {
  expect(refusalOf({ pageType: "domain", expands: true })).toContain("none was handed in")
})

test("a where over a query that expands is checked once and holds over every page handed in", () => {
  const declared = declaredOf({ "on-call": { type: BOOLEAN } })
  const query = checked(
    { pageType: "agent", expands: true, where: "{on-call}" },
    declared,
    extending({ seat: "agent" })
  )
  expect(family(query)).toEqual(["agent", "seat"])
  const pages = [
    pageOf("in", { "on-call": boolean(true) }),
    pageOf("out", { "on-call": boolean(false) }),
  ]
  expect(at(runQuery(query, pages))).toEqual(["in"])
})

test("a where holding of a page keeps it, and one not holding drops it", () => {
  const declared = declaredOf({ "on-call": { type: BOOLEAN } })
  const query = checked({ pageType: "seat", where: "{on-call}" }, declared)
  const pages = [
    pageOf("in", { "on-call": boolean(true) }),
    pageOf("out", { "on-call": boolean(false) }),
  ]
  expect(at(runQuery(query, pages))).toEqual(["in"])
})

test("a page a where answers absent over is not a page the test found", () => {
  const declared = declaredOf({ "on-call": { type: BOOLEAN } })
  const query = checked({ pageType: "seat", where: "{on-call}" }, declared)
  expect(at(runQuery(query, [pageOf("silent", { slug: text("silent") })]))).toEqual([])
})

test("a where naming a key the page type does not declare is refused, naming that key", () => {
  const answer = checkQuery({ pageType: "seat", where: "{running}" }, declaredOf())
  if (answer.ok) throw new Error("checked")
  expect(answer.moment).toBe("checking")
  expect(answer.message).toContain("running")
})

test("a where answering a text is refused rather than run", () => {
  expect(refusalOf({ pageType: "seat", where: "{slug}" })).toBe(
    "a `where` answers a boolean, and this one answers a text"
  )
})

test("a where answering a number is refused rather than run", () => {
  const declared = declaredOf({ n: { type: NUMBER } })
  expect(refusalOf({ pageType: "seat", where: "{n} + 1" }, declared)).toBe(
    "a `where` answers a boolean, and this one answers a number"
  )
})

test("a where naming a key beyond the language is refused saying what that key holds", () => {
  const declared = declaredOf({}, { "turn-end-decisions": "pages" })
  expect(refusalOf({ pageType: "seat", where: '{turn-end-decisions} == "x"' }, declared)).toBe(
    "`turn-end-decisions` is declared to hold `pages`, which no formula holds"
  )
})

test("a key declared a number is compared numerically, whatever any page holds", () => {
  const declared = declaredOf({ n: { type: NUMBER } })
  const query = checked({ pageType: "run", where: "{n} > 9" }, declared)
  const pages = [pageOf("ten", { n: number(10) }), pageOf("nine", { n: number(9) })]
  expect(at(runQuery(query, pages))).toEqual(["ten"])
})

test("a key declared a text is refused an ordering rather than given one over its data", () => {
  const declared = declaredOf({ v: { type: TEXT } })
  expect(refusalOf({ pageType: "run", where: '{v} > "9"' }, declared)).toContain("`>`")
})

test("an instant is reached by a function taking one, never by an ordering", () => {
  const declared = declaredOf({ "woke-at": { type: INSTANT } })
  expect(refusalOf({ pageType: "seat", where: "{woke-at} > 0" }, declared)).toContain("function")
  const query = checked(
    { pageType: "seat", where: "hoursBetween({woke-at}, now()) < 1" },
    declared
  )
  const values = { now: 3_600_000, properties: { "woke-at": { kind: "instant", instant: 0 } } }
  expect(at(runQuery(query, [{ at: "old", values } as Page]))).toEqual([])
})

test("a where whose types do not meet is refused at checking", () => {
  const declared = declaredOf({ n: { type: NUMBER } })
  const answer = checkQuery({ pageType: "run", where: '{n} > "9"' }, declared)
  if (answer.ok) throw new Error("checked")
  expect(answer.moment).toBe("checking")
  expect(answer.message).toContain("number")
})

test("a where wrong in its own text is refused at reading, not at checking", () => {
  const answer = checkQuery({ pageType: "run", where: "{slug" }, declaredOf())
  if (answer.ok) throw new Error("checked")
  expect(answer.moment).toBe("reading")
})

test("a key some page types beneath declare and others do not is answered by every one of them", () => {
  const above = declaredOf()
  const below = declaredOf({ enabled: { type: BOOLEAN } })
  const query = checked(
    { pageType: "domain", expands: true, keys: ["slug", "enabled"] },
    above,
    extending({ command: "domain", task: "domain" }),
    declaring({ domain: above, command: below, task: above })
  )
  const found = runQuery(query, [
    pageOf("akasha:one.domain.md", { slug: text("one"), id: text("1") }),
    pageOf("akasha:two.command.md", { slug: text("two"), enabled: boolean(true) }),
  ])
  expect(found.map((page) => page.values.properties["enabled"])).toEqual([
    { kind: "absent" },
    boolean(true),
  ])
  expect(found.map((page) => page.values.properties["slug"])).toEqual([text("one"), text("two")])
  for (const page of found) expect(keysOf(page)).toEqual(["slug", "enabled"])
})

test("a key no page type asked about declares is refused rather than answered absent everywhere", () => {
  const above = declaredOf()
  expect(
    refusalOf(
      { pageType: "domain", expands: true, keys: ["slug", "running"] },
      above,
      extending({ command: "domain" }),
      declaring({ domain: above, command: above })
    )
  ).toBe("no page type this asks about declares `running`")
})

test("a page type asked about declaring none of the keys asked for is refused, naming it", () => {
  const above = declaredOf()
  const apart: Declared = { properties: { code: { type: TEXT } }, beyond: {} }
  expect(
    refusalOf(
      { pageType: "domain", expands: true, keys: ["slug"] },
      above,
      extending({ oddity: "domain" }),
      declaring({ domain: above, oddity: apart })
    )
  ).toBe(
    "no key asked for is declared by `oddity`, whose pages would answer absent under every one of them"
  )
})

test("a query asking for keys with nothing said of what each page type declares is refused", () => {
  expect(
    refusalOf(
      { pageType: "domain", expands: true, keys: ["slug"] },
      declaredOf(),
      extending({ command: "domain" })
    )
  ).toContain("`command`")
})

test("a query naming one page type holds its keys to that page type alone", () => {
  expect(refusalOf({ pageType: "seat", keys: ["running"] })).toBe(
    "no page type this asks about declares `running`"
  )
})

test("a key declared to hold what a page is not answered with is refused saying what it holds", () => {
  const declared = declaredOf({}, { "turn-end-decisions": "pages" })
  expect(refusalOf({ pageType: "seat", keys: ["turn-end-decisions"] }, declared)).toBe(
    "`turn-end-decisions` is declared to hold `pages`, which a page is not answered with"
  )
})

test("a query asking for keys and naming none is refused", () => {
  expect(refusalOf({ pageType: "seat", keys: [] })).toContain("at least one")
})

test("a query asking for no keys answers the pages as they were read", () => {
  const pages = [pageOf("a", { slug: text("a"), id: text("1") })]
  expect(runQuery(checked({ pageType: "seat" }), pages)).toBe(pages)
})

test("a where may name a key the query did not ask for, the narrowing coming after the test", () => {
  const declared = declaredOf({ "on-call": { type: BOOLEAN } })
  const query = checked({ pageType: "seat", keys: ["slug"], where: "{on-call}" }, declared)
  const found = runQuery(query, [
    pageOf("in", { slug: text("in"), "on-call": boolean(true) }),
    pageOf("out", { slug: text("out"), "on-call": boolean(false) }),
  ])
  expect(at(found)).toEqual(["in"])
  expect(keysOf(found[0])).toEqual(["slug"])
})

test("a checked query cannot be reached past its keys by answering the pages itself", () => {
  const query = checked({ pageType: "seat", keys: ["slug"] })
  expect(keysOf(query.answer([pageOf("a", { slug: text("a"), id: text("1") })])[0])).toEqual([
    "slug",
  ])
})

test("a refusal is not something runQuery can be handed", () => {
  const answer = checkQuery({ pageType: "seat", where: "{slug}" }, declaredOf())
  expect(answer.ok).toBe(false)
  expect("answer" in answer).toBe(false)
})
