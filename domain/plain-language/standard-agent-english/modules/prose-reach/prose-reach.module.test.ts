import { expect, test } from "bun:test"
import {
  proseFrom,
  type Reach,
} from "akasha/domain/plain-language/standard-agent-english/modules/prose-reach/prose-reach.module.code.ts"
import { decisionKind } from "akasha/domain/properties/decision-kind.relation-property.ts"
import { decisions } from "akasha/domain/properties/decisions.record-property.ts"
import { name } from "akasha/domain/properties/name.text-property.ts"
import {
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { recordProperty } from "akasha/page/record-property/record-property.page-type.ts"
import { relationProperty } from "akasha/page/relation-property/relation-property.page-type.ts"
import { textProperty } from "akasha/page/text-property/text-property.page-type.ts"
import {
  carriedFrom,
  sourceOver,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const PROSE = "standard-agent-english-property"

const RECORD = "record-property"

const KIND_AT = `${relationProperty.slug}/${decisionKind.slug}` as const

const NAME_AT = `${textProperty.slug}/${name.slug}` as const

const DECISIONS_AT = `${recordProperty.slug}/${decisions.slug}` as const

function reachOver(values: readonly Value[]): Reach {
  const source = sourceOver(values)
  const held = new Map<string, Value>()
  for (const value of values) {
    const type = textAt(value, "type")
    const slug = textAt(value, "slug")
    if (type === null || slug === null) continue
    held.set(`${slugOf(type)}/${slug}`, value)
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

const DEFINITION = {
  type: `${pageType.slug}/${PROSE}`,
  slug: "definition",
  propertySlug: "definition",
}

const STATEMENT = {
  type: `${pageType.slug}/${PROSE}`,
  slug: "decision-statement",
  propertySlug: "statement",
}

const NAME = { type: `${pageType.slug}/text-property`, slug: "name", propertySlug: "name" }

const KIND = {
  type: `${pageType.slug}/relation-property`,
  slug: "decision-kind",
  propertySlug: "decision-kind",
}

const DECISIONS = {
  type: `${pageType.slug}/${RECORD}`,
  slug: "decisions",
  propertySlug: "decisions",
  properties: [
    { pagePropertySlug: KIND_AT, required: true, many: false },
    { pagePropertySlug: `${PROSE}/decision-statement`, required: true, many: false },
  ],
}

const NESTED = {
  type: `${pageType.slug}/${RECORD}`,
  slug: "nested",
  propertySlug: "nested",
  properties: [{ pagePropertySlug: "record-property/nested", required: false, many: false }],
}

function typed(slug: string, properties: readonly Value[], above: readonly string[] = []) {
  return { type: `${pageType.slug}/${pageType.slug}`, slug, extends: above, properties }
}

const HELD: readonly Value[] = [DEFINITION, STATEMENT, NAME, KIND, DECISIONS, NESTED]

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
  const one = typed("one", [{ pagePropertySlug: NAME_AT, required: false, many: false }])
  expect(proseOn([one], "one")).toEqual([])
})

test("a prose field of a record is reached under the record's key", () => {
  const one = typed("one", [
    { pagePropertySlug: DECISIONS_AT, required: false, many: true, maxCount: null },
  ])
  expect(proseOn([one], "one")).toEqual([{ key: "decisions", under: ["statement"] }])
})

test("a field of a record that is no prose is not reached", () => {
  const one = typed("one", [
    { pagePropertySlug: DECISIONS_AT, required: false, many: true, maxCount: null },
  ])
  expect(proseOn([one], "one").some((at) => at.under.includes("decisionKind"))).toBe(false)
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
