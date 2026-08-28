import { expect, test } from "bun:test"
import type { Value, Values } from "../formula/formula.ts"
import { type Declaring, keysRefused, narrowed } from "./keys.ts"
import type { Declared, Page } from "./query.ts"

const TEXT = { kind: "text" } as const

const declaredOf = (...keys: readonly string[]): Declared => ({
  properties: Object.fromEntries(keys.map((key) => [key, { type: TEXT }])),
  beyond: {},
})

const declaring = (of: Record<string, Declared>): Declaring => new Map(Object.entries(of))

const pageOf = (at: string, properties: Record<string, Value>): Page => ({
  at,
  values: { now: 7, properties } satisfies Values,
})

const text = (of: string): Value => ({ kind: "text", text: of })

const keysOf = (page: Page | undefined): readonly string[] =>
  Object.keys(page?.values.properties ?? {})

test("keys and page types covering each other are not refused", () => {
  expect(keysRefused(["slug"], ["domain"], declaring({ domain: declaredOf("slug") }))).toBe(null)
})

test("a key declared by some page types asked about and not the rest is not refused", () => {
  const held = declaring({ domain: declaredOf("slug"), command: declaredOf("slug", "enabled") })
  expect(keysRefused(["slug", "enabled"], ["domain", "command"], held)).toBe(null)
})

test("asking for keys and naming none is refused", () => {
  expect(keysRefused([], ["a"], declaring({ a: declaredOf("slug") }))).toContain("at least one")
})

test("a page type asked about and not handed in is refused rather than read as declaring nothing", () => {
  const refused = keysRefused(["slug"], ["a", "b"], declaring({ a: declaredOf("slug") }))
  expect(refused).toContain("`b`")
  expect(refused).toContain("nothing was handed in")
})

test("a key nowhere in the set is refused, naming that key", () => {
  const held = declaring({ a: declaredOf("slug"), b: declaredOf("slug") })
  expect(keysRefused(["slug", "running"], ["a", "b"], held)).toBe(
    "no page type this asks about declares `running`"
  )
})

test("a key nowhere is reported before a page type covering nothing", () => {
  const held = declaring({ a: declaredOf("slug"), b: declaredOf("other") })
  expect(keysRefused(["slug", "running"], ["a", "b"], held)).toBe(
    "no page type this asks about declares `running`"
  )
})

test("a key declared to hold what a page is not answered with is refused saying what it holds", () => {
  const held = declaring({ a: { properties: {}, beyond: { lines: "pages" } } })
  expect(keysRefused(["lines"], ["a"], held)).toBe(
    "`lines` is declared to hold `pages`, which a page is not answered with"
  )
})

test("a page type declaring none of the keys asked for is refused, naming it", () => {
  const held = declaring({ a: declaredOf("slug"), b: declaredOf("other") })
  expect(keysRefused(["slug"], ["a", "b"], held)).toBe(
    "no key asked for is declared by `b`, whose pages would answer absent under every one of them"
  )
})

test("a refusal names three page types and counts the rest", () => {
  const held = declaring({
    a: declaredOf("slug"),
    b: declaredOf("other"),
    c: declaredOf("other"),
    d: declaredOf("other"),
    e: declaredOf("other"),
  })
  expect(keysRefused(["slug"], ["a", "b", "c", "d", "e"], held)).toContain(
    "`b`, `c`, `d` and 1 more"
  )
})

test("a refusal naming no more page types than it shows counts none of them", () => {
  const held = declaring({ a: declaredOf("slug"), b: declaredOf("other") })
  expect(keysRefused(["slug"], ["a", "b"], held)).not.toContain("more")
})

test("no keys asked for leaves the pages exactly as they were read", () => {
  const pages = [pageOf("akasha:a.domain.md", { slug: text("a") })]
  expect(narrowed(pages, null)).toBe(pages)
})

test("a narrowed page holds every key asked for and no others", () => {
  const read = [pageOf("akasha:a.domain.md", { slug: text("a"), id: text("1") })]
  const found = narrowed(read, ["slug"])
  expect(keysOf(found[0])).toEqual(["slug"])
  expect(found[0]?.values.properties["slug"]).toEqual(text("a"))
})

test("a key the page holds nothing under stands absent rather than missing", () => {
  const found = narrowed([pageOf("akasha:a.domain.md", { slug: text("a") })], ["slug", "enabled"])
  expect(keysOf(found[0])).toEqual(["slug", "enabled"])
  expect(found[0]?.values.properties["enabled"]).toEqual({ kind: "absent" })
})

test("a narrowed page keeps its address and the moment it was read at", () => {
  const found = narrowed([pageOf("akasha:a.domain.md", { slug: text("a") })], ["slug"])
  expect(found[0]?.at).toBe("akasha:a.domain.md")
  expect(found[0]?.values.now).toBe(7)
})

test("the keys stand in the order they were asked for, not the order the page holds them", () => {
  const read = [pageOf("akasha:a.domain.md", { id: text("1"), slug: text("a") })]
  expect(keysOf(narrowed(read, ["slug", "id"])[0])).toEqual(["slug", "id"])
})
