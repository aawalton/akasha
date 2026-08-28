import { expect, test } from "bun:test"
import type { Value, Values } from "../formula/formula.ts"
import { type Checked, checkQuery, type Declared, type Page, type Query, runQuery } from "./query.ts"

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

const checked = (query: Query, declared: Declared = declaredOf()): Checked => {
  const answer = checkQuery(query, declared)
  if (!answer.ok) throw new Error(`refused: ${answer.message}`)
  return answer
}

const refusalOf = (query: Query, declared: Declared = declaredOf()): string => {
  const answer = checkQuery(query, declared)
  if (answer.ok) throw new Error("checked")
  return answer.message
}

const at = (pages: readonly Page[]): readonly string[] => pages.map((page) => page.at)

test("a query stating no where asks for every page of its page type", () => {
  const pages = [pageOf("a", { slug: text("a") }), pageOf("b", { slug: text("b") })]
  expect(at(runQuery(checked({ pageType: "seat" }), pages))).toEqual(["a", "b"])
})

test("a checked query carries the page type it names, which is what a store is asked for", () => {
  expect(checked({ pageType: "seat" }).pageType).toBe("seat")
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
