import { expect, test } from "bun:test"
import type { Value, Values } from "../formula/formula.ts"
import { type Checked, checkQuery, type Declared, type Page, type Query, runQuery } from "./query.ts"

const TEXT = { kind: "text" } as const
const NUMBER = { kind: "number" } as const

const declaredOf = (): Declared => ({
  properties: { slug: { type: TEXT }, rank: { type: NUMBER } },
  beyond: {},
})

const pageOf = (at: string, properties: Record<string, Value>): Page => ({
  at,
  values: { now: 0, properties } satisfies Values,
})

const number = (of: number): Value => ({ kind: "number", number: of })

const checked = (query: Query): Checked => {
  const answer = checkQuery(query, declaredOf())
  if (!answer.ok) throw new Error(`refused: ${answer.message}`)
  return answer
}

const refusalOf = (query: Query): string => {
  const answer = checkQuery(query, declaredOf())
  if (answer.ok) throw new Error("checked")
  return answer.message
}

const at = (pages: readonly Page[]): readonly string[] => pages.map((page) => page.at)

const three: readonly Page[] = [
  pageOf("one", { rank: number(1) }),
  pageOf("two", { rank: number(2) }),
  pageOf("three", { rank: number(3) }),
]

test("an offset passes over the pages before it, where the same query without one answers all", () => {
  const without: Query = { pageType: "song", sortBy: "rank" }
  expect(at(runQuery(checked(without), three))).toEqual(["one", "two", "three"])
  expect(at(runQuery(checked({ ...without, offset: 2 }), three))).toEqual(["three"])
})

test("an offset passes over pages before a limit counts, so the two name a window", () => {
  const without: Query = { pageType: "song", sortBy: "rank", limit: 1 }
  expect(at(runQuery(checked(without), three))).toEqual(["one"])
  expect(at(runQuery(checked({ ...without, offset: 1 }), three))).toEqual(["two"])
})

test("an offset counts the pages a where kept, not the pages the store handed in", () => {
  const without: Query = { pageType: "song", where: "{rank} > 1", sortBy: "rank" }
  expect(at(runQuery(checked(without), three))).toEqual(["two", "three"])
  expect(at(runQuery(checked({ ...without, offset: 1 }), three))).toEqual(["three"])
})

test("an offset past every page found answers none, rather than the last of them", () => {
  expect(at(runQuery(checked({ pageType: "song", offset: 9 }), three))).toEqual([])
})

test("an offset of nought passes over nothing, answering what a query stating none answers", () => {
  const stated = at(runQuery(checked({ pageType: "song", offset: 0 }), three))
  expect(stated).toEqual(at(runQuery(checked({ pageType: "song" }), three)))
})

test("an offset leaves the page types a query asks the store for unchanged", () => {
  expect(checked({ pageType: "song", offset: 2 }).pageTypes).toEqual(
    checked({ pageType: "song" }).pageTypes
  )
})

test("an offset fewer than no pages is refused rather than counted back from the end", () => {
  expect(refusalOf({ pageType: "song", offset: -1 })).toBe(
    "an \`offset\` is how many pages a query passes over, so it is never fewer than none, and this one states \`-1\`"
  )
})

test("an offset that is not a whole number of pages is refused", () => {
  expect(refusalOf({ pageType: "song", offset: 1.5 })).toBe(
    "an \`offset\` is a whole number of pages, and this one states \`1.5\`"
  )
})

test("an offset is refused at checking, in the terms the query was written in", () => {
  const answer = checkQuery({ pageType: "song", offset: -1 }, declaredOf())
  if (answer.ok) throw new Error("checked")
  expect(answer.moment).toBe("checking")
})
