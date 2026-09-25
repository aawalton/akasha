import { expect, test } from "bun:test"
import {
  defaultReasonsIn,
  type Reaching,
} from "akasha/check/code/pages/page-matches-its-type/modules/default-reasons/default-reasons.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const FLAG = "boolean-property/flag"

const COUNT = "number-property/count"

const OWNER = "relation-property/quoin-owner"

const STANDING = "select-property/standing"

const LINES = "file-property/quoin-lines"

const NOTE = "text-property/quoin-note"

const NAMED = "persona/quoin-named"

const ASSIGNED = "domain/quoin-assigned"

const EITHER = "one-of-property/either"

const TYPE = "page-type/quoin"

const PAGES: Readonly<Record<string, Value>> = {
  [STANDING]: { slug: "standing", values: ["proposed", "held"] },
  [LINES]: { slug: "quoin-lines", extensions: ["jsonl"] },
  [EITHER]: { slug: "either", members: [OWNER, COUNT] },
}

const INDEX: Reaching = {
  kindsUnder: (slug) => new Set([slug]),
  pageAt: (pageTypeSlug, slug) => PAGES[`${pageTypeSlug}/${slug}`] ?? null,
}

function declaring(pageProperty: string, held: unknown): Value {
  return {
    type: TYPE,
    slug: "quoin",
    properties: [{ pageProperty, required: false, many: false, default: held }],
  } as Value
}

function judged(pageProperty: string, held: unknown): readonly string[] {
  return defaultReasonsIn(declaring(pageProperty, held), INDEX)
}

test("a default a boolean property holds is a boolean rather than text", () => {
  expect(judged(FLAG, true)).toEqual([])
  expect(judged(FLAG, "true")).toEqual([
    '`boolean-property/flag` defaults to "true", and that property holds a boolean',
  ])
})

test("a default a number property holds is a number rather than text", () => {
  expect(judged(COUNT, 100)).toEqual([])
  expect(judged(COUNT, "100")).toHaveLength(1)
})

test("a default a relation holds names its page by that page's address", () => {
  expect(judged(OWNER, NAMED)).toEqual([])
  expect(judged(OWNER, "claude")).toEqual([
    `\`${OWNER}\` defaults to "claude", and that property holds a page's address`,
  ])
})

test("a default a select property holds is one of the values that property offers", () => {
  expect(judged(STANDING, "held")).toEqual([])
  expect(judged(STANDING, "gone")).toHaveLength(1)
})

test("a default a file property holds is one of the extensions that property takes", () => {
  expect(judged(LINES, "jsonl")).toEqual([])
  expect(judged(LINES, "txt")).toHaveLength(1)
})

test("a default a text property holds is text", () => {
  expect(judged(NOTE, "opus")).toEqual([])
  expect(judged(NOTE, false)).toHaveLength(1)
})

test("a default a one-of property holds is what one of its members holds", () => {
  expect(judged(EITHER, ASSIGNED)).toEqual([])
  expect(judged(EITHER, 5)).toEqual([])
  expect(judged(EITHER, "akasha")).toEqual([
    '`one-of-property/either` defaults to "akasha", and that property holds a page\'s address or a number',
  ])
})

test("a declaration stating no default and a page declaring nothing give no reason", () => {
  const bare = { type: TYPE, slug: "quoin", properties: [{ pageProperty: FLAG }] }
  expect(defaultReasonsIn(bare as Value, INDEX)).toEqual([])
  expect(defaultReasonsIn({ type: "page-type/quoin", slug: "one" }, INDEX)).toEqual([])
})
