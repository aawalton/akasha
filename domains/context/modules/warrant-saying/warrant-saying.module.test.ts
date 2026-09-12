import { expect, test } from "bun:test"
import {
  againOf,
  callOf,
  fromTabooTerm,
  movedOf,
  notReadOf,
  partlyOf,
  sayingOf,
  tabooOf,
} from "akasha/domains/context/modules/warrant-saying/warrant-saying.module.code.ts"
import type { Warrant } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const AT = "one.domain.ts"

const B = "two.domain.ts"

const TERM_AT = "three.taboo-term.ts"

const OWED = "A page answers to its type."

const WARRANT: Warrant = { path: AT, oid: "one", owed: OWED }

const TERM: Warrant = { path: TERM_AT, oid: "two", owed: OWED }

const OVER: Warrant = { path: AT, oid: "one", owed: OWED, over: B }

const ITSELF: Warrant = { path: AT, oid: "one", owed: OWED, over: AT }

test("one read call names every page a refusal names", () => {
  expect(callOf([AT, B])).toBe(`  akasha read --file-path ${AT} --file-path ${B}`)
})

test("a page owed twice is named once in the read", () => {
  expect(callOf([AT, B, AT])).toBe(callOf([AT, B]))
})

test("a page the record does not answer for is named with why the reading is owed", () => {
  expect(notReadOf(WARRANT)).toBe(`${AT} — the record does not show you read this.\n${OWED}`)
})

test("a refusal names the page the warrant ran over, so why it is owed has a subject", () => {
  expect(notReadOf(OVER)).toBe(
    `${AT} — the record does not show you read this.\n${OWED} It is owed over ${B}.`
  )
})

test("a warrant that ran over the page it names says nothing more than the rule", () => {
  expect(notReadOf(ITSELF)).toBe(notReadOf(WARRANT))
  expect(notReadOf(WARRANT)).not.toContain("It is owed over")
})

test("a body that moved and a body read in part name that page as a page unread does", () => {
  expect(movedOf(OVER, "three")).toContain(`It is owed over ${B}.`)
  expect(partlyOf(OVER, 40)).toContain(`It is owed over ${B}.`)
  expect(movedOf(ITSELF, "three")).toBe(movedOf(WARRANT, "three"))
})

test("a refusal for a body that moved says what the record holds and what is there now", () => {
  const said = movedOf(WARRANT, "three")
  expect(said).toContain("you read this, and it has changed since")
  expect(said).toContain("Your record holds three, and one is there now.")
  expect(said).toContain(OWED)
})

test("a refusal for a body read in part says how far that body reached the agent", () => {
  const said = partlyOf(WARRANT, 40)
  expect(said).toContain("part of this reached you, and the rest has not")
  expect(said).toContain("Your record holds line 40 as how far this body has reached you.")
})

test("a warrant owed of a taboo term is told from the rest by the page type its path names", () => {
  expect(fromTabooTerm(TERM)).toBe(true)
  expect(fromTabooTerm(WARRANT)).toBe(false)
})

test("the refusal said of a taboo term asks the writer for a decision about the change", () => {
  const said = tabooOf({ warrant: TERM, held: null }, null)
  expect(said).toContain("NAMING DECISION")
  expect(said).toContain("reword where you meant a sense the term bars")
})

test("the refusal said of a taboo term hands that term's whole page back", () => {
  const said = tabooOf({ warrant: TERM, held: null }, "export const three = {}\n")
  expect(said).toContain("states the term, and the whole page follows")
  expect(said).toContain("export const three = {}")
  expect(said).toContain("run this same call again")
})

test("a list held back says how many readings are owed past it and to call again", () => {
  expect(againOf(1)).toContain("one more page is owed")
  expect(againOf(2)).toContain("2 more pages are owed")
  expect(againOf(2)).toContain("run this call again")
})

test("which saying one owing takes is decided by what the record holds of that body", () => {
  expect(sayingOf({ warrant: WARRANT, held: null })).toBe(notReadOf(WARRANT))
  expect(sayingOf({ warrant: WARRANT, held: "three" })).toBe(movedOf(WARRANT, "three"))
  expect(sayingOf({ warrant: WARRANT, held: "one", reach: 40 })).toBe(partlyOf(WARRANT, 40))
  expect(sayingOf({ warrant: TERM, held: null })).toBe(tabooOf({ warrant: TERM, held: null }, null))
})
