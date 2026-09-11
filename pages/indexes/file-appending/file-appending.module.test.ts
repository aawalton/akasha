import { expect, test } from "bun:test"
import {
  appendingFor,
  appendOnlyIn,
  appendsOnly,
} from "akasha/pages/indexes/file-appending/file-appending.module.code.ts"
import type {
  Carried,
  Facing,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const ONE = "01a058c0-0000-7000-8000-000000000001"

const AT = "akasha/entries.file-property.ts"

const BESIDE = "akasha/one.thing.ts"

const SECTIONED = "akasha/one.thing.entries.jsonl"

const NAMED = "akasha/lines.jsonl"

const ELSEWHERE = "elsewhere/lines.jsonl"

const SAYS: Value = { slug: "entries", propertySlug: "entries", appendOnly: true }

const QUIET: Value = { slug: "entries", propertySlug: "entries" }

const NAMES: Value = {
  slug: "entries",
  propertySlug: "entries",
  fileName: "lines.jsonl",
  appendOnly: true,
}

function carryingAt(named: string): Carried {
  return named === "file-property/entries"
    ? { carrying: [{ pageTypeSlug: "thing", path: BESIDE, id: ONE, within: null }] }
    : { refused: "no page property carries that slug" }
}

function facingSaying(value: Value, seen: { reads: number }): Facing {
  return {
    kindsUnder: () => ["file-property"],
    everyOfType: () => {
      seen.reads += 1
      return [{ path: AT }]
    },
    valueAt: () => value,
    carryingOf: carryingAt,
    filesIn: () => [],
  }
}

function facing(value: Value): Facing {
  return facingSaying(value, { reads: 0 })
}

test("a value saying true here is only added to at its end", () => {
  expect(appendsOnly(SAYS)).toBe(true)
})

test("a value saying nothing here holds a file that may be rewritten", () => {
  expect(appendsOnly(QUIET)).toBe(false)
})

test("a property naming no file says it of each file the property's section names", () => {
  expect(appendOnlyIn(facing(SAYS), SECTIONED)).toBe(true)
})

test("a property saying nothing here says it of no file its section names", () => {
  expect(appendOnlyIn(facing(QUIET), SECTIONED)).toBe(false)
})

test("a property naming a file says it of that file beside a page carrying the property", () => {
  expect(appendOnlyIn(facing(NAMES), NAMED)).toBe(true)
})

test("a file of that name in another folder is beside nothing", () => {
  expect(appendOnlyIn(facing(NAMES), ELSEWHERE)).toBe(false)
})

test("what a face says over every file property is worked out once for that face", () => {
  const seen = { reads: 0 }
  const one = facingSaying(SAYS, seen)
  expect(appendingFor(one).size).toBe(1)
  expect(appendingFor(one).size).toBe(1)
  expect(seen.reads).toBe(1)
})

test("a face built again works it out again", () => {
  const seen = { reads: 0 }
  expect(appendingFor(facingSaying(SAYS, seen)).size).toBe(1)
  expect(appendingFor(facingSaying(SAYS, seen)).size).toBe(1)
  expect(seen.reads).toBe(2)
})
