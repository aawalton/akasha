import { expect, test } from "bun:test"
import {
  narrowedWrite,
  personOf,
  whereWithin,
} from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { ANONYMOUS_PERSON } from "akasha/person/modules/page-type-access/page-type-access.module.code.ts"

test("a reader no session names is the reader nobody signed in as", async () => {
  expect(await personOf(null)).toBe(ANONYMOUS_PERSON)
})

test("a reader carrying no contributor is read the same way", async () => {
  expect(await personOf({})).toBe(ANONYMOUS_PERSON)
  expect(await personOf({ contributor: "" })).toBe(ANONYMOUS_PERSON)
})

test("a reader naming its person outright is read as that person", async () => {
  expect(await personOf({ person: "one" })).toBe("one")
})

test("a narrowed access lets its holder read and never write", () => {
  expect(narrowedWrite({ permitted: true, narrows: null })).toBeNull()
  const why = narrowedWrite({
    permitted: true,
    narrows: [{ key: "standing", is: "published" }],
  })
  expect(why).toContain("carries a narrow")
})

const BY_ID = { id: { is: "01a0" } }

const ONE_SEAT = { permitted: true, narrows: [{ key: "slug", is: "couples-therapist" }] } as const

test("a reader reading every page is asked what was asked", () => {
  expect(whereWithin({ permitted: true, narrows: null }, BY_ID)).toEqual({ where: BY_ID })
})

test("a page asked by id is held to the narrow on another key", () => {
  expect(whereWithin(ONE_SEAT, BY_ID)).toEqual({
    where: { ...BY_ID, slug: { is: "couples-therapist" } },
  })
})

test("a page asked by the narrowed key is refused outside the narrow", () => {
  expect(whereWithin(ONE_SEAT, { slug: { is: "couples-therapist" } })).toEqual({
    where: { slug: { is: "couples-therapist" } },
  })
  expect(whereWithin(ONE_SEAT, { slug: { is: "amy" } })).toHaveProperty("refused")
})

test("a reader holding no access is refused with why", () => {
  expect(whereWithin({ permitted: false, why: "no" }, BY_ID)).toEqual({ refused: "no" })
})
