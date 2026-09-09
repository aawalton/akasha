import { expect, test } from "bun:test"
import { carriedFrom, sourceOver } from "@akasha/pages/page-type-properties"
import { textAt, type Value } from "@akasha/pages/page-value"
import { proseFrom, type Reach } from "./prose-reach.module.code.ts"

const PROSE = "standard-agent-english-property"

const RECORD = "record-property"

function reachOver(values: readonly Value[]): Reach {
  const source = sourceOver(values)
  const held = new Map<string, Value>()
  for (const value of values) {
    const pageTypeSlug = textAt(value, "pageTypeSlug")
    const slug = textAt(value, "slug")
    if (pageTypeSlug === null || slug === null) continue
    held.set(`${pageTypeSlug}/${slug}`, value)
  }
  return {
    prose: new Set([PROSE]),
    record: new Set([RECORD]),
    source,
    fieldsOf: (one) => {
      const value = held.get(`${one.pageTypeSlug}/${one.pagePropertySlug}`)
      return value === undefined ? [] : carriedFrom(value, source, one.pagePropertySlug)
    },
  }
}

const DEFINITION = { pageTypeSlug: PROSE, slug: "definition", propertySlug: "definition" }

const STATEMENT = { pageTypeSlug: PROSE, slug: "invariant-statement", propertySlug: "statement" }

const NAME = { pageTypeSlug: "text-property", slug: "name", propertySlug: "name" }

const KIND = {
  pageTypeSlug: "relation-property",
  slug: "invariant-kind",
  propertySlug: "invariant-kind",
}

const INVARIANTS = {
  pageTypeSlug: RECORD,
  slug: "invariants",
  propertySlug: "invariants",
  properties: [
    { pagePropertySlug: "relation-property/invariant-kind", required: true, many: false },
    { pagePropertySlug: `${PROSE}/invariant-statement`, required: true, many: false },
  ],
}

const NESTED = {
  pageTypeSlug: RECORD,
  slug: "nested",
  propertySlug: "nested",
  properties: [{ pagePropertySlug: "record-property/nested", required: false, many: false }],
}

function typed(slug: string, properties: readonly Value[], above: readonly string[] = []) {
  return { pageTypeSlug: "page-type", slug, extends: above, properties }
}

const HELD: readonly Value[] = [DEFINITION, STATEMENT, NAME, KIND, INVARIANTS, NESTED]

function proseOn(values: readonly Value[], slug: string) {
  return proseFrom(slug, reachOver([...HELD, ...values]))
}

test("a prose property is reached under the key its page states", () => {
  const one = typed("one", [
    { pagePropertySlug: `${PROSE}/definition`, required: true, many: false },
  ])
  expect(proseOn([one], "one")).toEqual([{ key: "definition", under: [] }])
})

test("a property that is no prose is not reached", () => {
  const one = typed("one", [
    { pagePropertySlug: "text-property/name", required: false, many: false },
  ])
  expect(proseOn([one], "one")).toEqual([])
})

test("a prose field of a record is reached under the record's key", () => {
  const one = typed("one", [
    { pagePropertySlug: "record-property/invariants", required: false, many: true, maxCount: null },
  ])
  expect(proseOn([one], "one")).toEqual([{ key: "invariants", under: ["statement"] }])
})

test("a field of a record that is no prose is not reached", () => {
  const one = typed("one", [
    { pagePropertySlug: "record-property/invariants", required: false, many: true, maxCount: null },
  ])
  expect(proseOn([one], "one").some((at) => at.under.includes("invariantKind"))).toBe(false)
})

test("a prose property the type above states is reached", () => {
  const above = typed("above", [
    { pagePropertySlug: `${PROSE}/definition`, required: true, many: false },
  ])
  const one = typed("one", [], ["page-type/above"])
  expect(proseOn([above, one], "one")).toEqual([{ key: "definition", under: [] }])
})

test("a record naming itself is walked once rather than for ever", () => {
  const one = typed("one", [
    { pagePropertySlug: "record-property/nested", required: false, many: false },
  ])
  expect(proseOn([one], "one")).toEqual([])
})

test("a page type this does not know reaches no prose", () => {
  expect(proseOn([], "missing")).toEqual([])
})
