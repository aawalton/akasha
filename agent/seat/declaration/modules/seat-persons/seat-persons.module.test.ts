import { expect, test } from "bun:test"
import {
  onePersonIn,
  personsOf,
  principalOfPersons,
  principalStatedIn,
} from "akasha/agent/seat/declaration/modules/seat-persons/seat-persons.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { jenny } from "akasha/person/pages/jenny/jenny.person.ts"
import { person } from "akasha/person/person.page-type.ts"

const ALAN_AT = `${person.slug}/${alan.slug}` as const

const JENNY_AT = `${person.slug}/${jenny.slug}` as const

test("a principal of several persons reads back as those persons", () => {
  expect(personsOf(principalOfPersons([alan.slug, jenny.slug]))).toEqual([alan.slug, jenny.slug])
  expect(principalOfPersons([alan.slug, jenny.slug])).toBe(`${alan.slug},${jenny.slug}`)
})

test("a principal of one person is that person's slug alone", () => {
  expect(principalOfPersons([alan.slug])).toBe(alan.slug)
  expect(personsOf(alan.slug)).toEqual([alan.slug])
})

test("the persons a seat states read as the principal those persons are", () => {
  expect(principalStatedIn([ALAN_AT, JENNY_AT])).toBe(`${alan.slug},${jenny.slug}`)
  expect(principalStatedIn([ALAN_AT])).toBe(alan.slug)
})

test("a seat stating no person reads as no principal", () => {
  expect(principalStatedIn([])).toBeNull()
  expect(principalStatedIn(undefined)).toBeNull()
  expect(principalStatedIn(ALAN_AT)).toBeNull()
})

test("a seat stating one person has that person, and a seat stating several has none", () => {
  expect(onePersonIn([ALAN_AT])).toBe(alan.slug)
  expect(onePersonIn([ALAN_AT, JENNY_AT])).toBeNull()
  expect(onePersonIn([])).toBeNull()
})
