import { expect, test } from "bun:test"
import { messageFor, noInitiative, readIn, saidFor } from "./initiative-move-intent.command.code.ts"

const ASKED = { slug: "held", statement: "A thing is so.", onto: "Another thing is so." }

test("three words are read as an initiative and two statements", () => {
  expect(readIn(["amy-work-panel-editing", "A thing is so.", "Another thing is so."])).toEqual({
    slug: "amy-work-panel-editing",
    statement: "A thing is so.",
    onto: "Another thing is so.",
  })
})

test("a call naming fewer than three words is refused", () => {
  const said = readIn(["amy-work-panel-editing", "A thing is so."])

  expect(said).toEqual({
    refused: [
      "this takes three words: an initiative, the statement the intent states and the statement the intent it is moved onto states, and 2 arrived",
    ],
  })
})

test("a call naming more than three words is refused", () => {
  const said = readIn(["one", "A thing is so.", "Another thing is so.", "3"])

  expect("refused" in said).toBe(true)
})

test("a statement of no text is refused", () => {
  const said = readIn(["one", "  ", "Another thing is so."])

  expect(said).toEqual({
    refused: ["the statement said is empty, and an intent is named by the statement it states"],
  })
})

test("an intent moved onto nothing is refused", () => {
  const said = readIn(["one", "A thing is so.", " "])

  expect(said).toEqual({
    refused: [
      "the intent moved onto is said as nothing, and an intent is named by the statement it states",
    ],
  })
})

test("an intent moved onto itself is refused", () => {
  const said = readIn(["one", "A thing is so.", "A thing is so."])

  expect(said).toEqual({ refused: ["an intent moved onto itself moves nowhere"] })
})

test("both words are judged, so one call says both refusals", () => {
  const said = readIn(["one", " ", "  "])

  expect("refused" in said && said.refused).toHaveLength(2)
})

test("a name that is no initiative is refused in words naming it", () => {
  expect(noInitiative("nowhere")).toBe(
    "`nowhere` names no initiative, so it holds no intents to order"
  )
})

test("the commit says which intent moved and what it moved onto", () => {
  expect(messageFor(ASKED)).toBe(
    "move the intent `A thing is so.` of held onto `Another thing is so.`"
  )
})

test("a run says what moved and the commit that run landed", () => {
  expect(saidFor(ASKED, "abc123")).toEqual([
    "held: the intent `A thing is so.` now sits where `Another thing is so.` did",
    "abc123",
  ])
})

test("a run landing no commit says what moved alone", () => {
  expect(saidFor(ASKED, null)).toEqual([
    "held: the intent `A thing is so.` now sits where `Another thing is so.` did",
  ])
})
