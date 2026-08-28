import { expect, test } from "bun:test"
import type { Value, Values } from "../formula/formula.ts"
import {
  type Checked,
  checkQuery,
  type Declared,
  type Extending,
  type Page,
  type Query,
  runQuery,
} from "./query.ts"

const TEXT = { kind: "text" } as const
const NUMBER = { kind: "number" } as const
const BOOLEAN = { kind: "boolean" } as const
const INSTANT = { kind: "instant" } as const

/** A page type carrying the keys every page has, plus whatever a case adds. */
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
  extending?: Extending
): Checked => {
  const answer = checkQuery(query, declared, extending)
  if (!answer.ok) throw new Error(`refused: ${answer.message}`)
  return answer
}

const refusalOf = (
  query: Query,
  declared: Declared = declaredOf(),
  extending?: Extending
): string => {
  const answer = checkQuery(query, declared, extending)
  if (answer.ok) throw new Error("checked")
  return answer.message
}

/** What each page type extends, written the way a page type states it: the slug it builds on. */
const extending = (of: Record<string, string>): Extending => new Map(Object.entries(of))

/** The family a checked query asks about, in an order a case can state. */
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

test("a refusal is not something runQuery can be handed", () => {
  const answer = checkQuery({ pageType: "seat", where: "{slug}" }, declaredOf())
  expect(answer.ok).toBe(false)
  expect("answer" in answer).toBe(false)
})
