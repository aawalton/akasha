import { expect, test } from "bun:test"
import {
  keyOf,
  type Listing,
  refusalsOf,
  type Stated,
} from "./identifier-names-one-page.code-check.decision.code.ts"

const ONE_AT = "akasha/one.check.ts"

const TWO_AT = "akasha/two.check.ts"

const OTHER_AT = "akasha/other.check.ts"

const HELD = "held"

const KEY = "page-type/check/slug/held"

function stating(path: string, said: string = HELD): Stated {
  return { path, uniqueKind: "page-type", scope: "check", propertySlug: "slug", said }
}

function listing(by: Readonly<Record<string, readonly string[]>>): Listing {
  return (uniqueKind, scope, propertySlug, said) => {
    const paths = by[`${uniqueKind}/${scope}/${propertySlug}/${said}`] ?? []
    return paths.map((path) => ({ path, id: path }))
  }
}

test("a key naming the unique kind, the scope, the property and the value is what is asked", () => {
  expect(keyOf(stating(ONE_AT))).toBe(KEY)
})

test("a key the index files one page at is let through", () => {
  expect(refusalsOf([stating(ONE_AT)], listing({ [KEY]: [ONE_AT] }))).toEqual([])
})

test("a key the index files no page at is let through", () => {
  expect(refusalsOf([stating(ONE_AT)], listing({}))).toEqual([])
})

test("two pages at one key refuse the later one, naming the earlier", () => {
  const said = refusalsOf([stating(ONE_AT), stating(TWO_AT)], listing({ [KEY]: [ONE_AT, TWO_AT] }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(TWO_AT)
  expect(said[0]?.reason).toContain(ONE_AT)
  expect(said[0]?.reason).toContain(KEY)
})

test("a page the index files at that key beside them refuses both, naming that page", () => {
  const held = listing({ [KEY]: [OTHER_AT, ONE_AT, TWO_AT] })
  const said = refusalsOf([stating(ONE_AT), stating(TWO_AT)], held)
  expect(said.map((one) => one.path)).toEqual([ONE_AT, TWO_AT])
  expect(said[0]?.reason).toContain(OTHER_AT)
})

test("each key one page states is judged on its own", () => {
  const held = listing({ [KEY]: [ONE_AT, OTHER_AT] })
  const said = refusalsOf([stating(ONE_AT), stating(ONE_AT, "other")], held)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain(KEY)
})
