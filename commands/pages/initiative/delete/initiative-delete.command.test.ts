import { expect, test } from "bun:test"
import {
  messageFor,
  namedSaid,
  namingOver,
  noInitiative,
  readIn,
  saidFor,
} from "akasha/commands/pages/initiative/delete/initiative-delete.command.code.ts"

const SEAT = { path: "seat-system/seats/pages/hum/hum.seat.ts", propertySlug: "assignment-slug" }

const OWN = { path: "domains/initiatives/pages/held.initiative.ts", propertySlug: "parts" }

test("one word is read as an initiative", () => {
  expect(readIn(["amy-harness-improvements"])).toEqual({ slug: "amy-harness-improvements" })
})

test("a call naming no word is refused", () => {
  expect(readIn([])).toEqual({
    refused: ["this takes one word: the initiative to take away, and 0 arrived"],
  })
})

test("a call naming two words is refused", () => {
  expect("refused" in readIn(["one", "two"])).toBe(true)
})

test("a name that is no initiative is refused in words naming it", () => {
  expect(noInitiative("nowhere")).toBe(
    "`nowhere` names no initiative, so there is no page to take away"
  )
})

test("the commit says which initiative went", () => {
  expect(messageFor("held")).toBe("delete the initiative held")
})

test("a page naming the initiative is said with the key naming it", () => {
  expect(namedSaid(SEAT)).toBe(
    "`seat-system/seats/pages/hum/hum.seat.ts` still names it as its `assignment-slug`"
  )
})

test("the page being taken away is no page still naming it", () => {
  expect(namingOver([OWN, SEAT], OWN.path)).toEqual([SEAT])
})

test("one page naming it twice under one key is named once", () => {
  expect(namingOver([SEAT, SEAT], OWN.path)).toEqual([SEAT])
})

test("the pages naming it are said in the order of their paths", () => {
  const first = { path: "a.seat.ts", propertySlug: "assignment-slug" }
  const second = { path: "b.seat.ts", propertySlug: "assignment-slug" }

  expect(namingOver([second, first], OWN.path)).toEqual([first, second])
})

test("a run names every page still naming the initiative and how to mend the index", () => {
  expect(saidFor("held", [SEAT], "abc123")).toEqual([
    "held is gone",
    "`seat-system/seats/pages/hum/hum.seat.ts` still names it as its `assignment-slug`",
    "the index files those names until `akasha index refresh` runs",
    "abc123",
  ])
})

test("a run nothing else names says the initiative went and nothing of the index", () => {
  expect(saidFor("held", [], "abc123")).toEqual(["held is gone", "abc123"])
})

test("a run landing no commit says what went alone", () => {
  expect(saidFor("held", [], null)).toEqual(["held is gone"])
})
