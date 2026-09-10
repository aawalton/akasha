import { expect, test } from "bun:test"
import { messageFor, noInitiative, readIn, saidFor } from "./initiative-move-intent.command.code.ts"

const ASKED = { slug: "held", statement: "A thing is so.", to: 1 }

test("three words are read as an initiative, a statement and a place", () => {
  expect(readIn(["amy-work-panel-editing", "A thing is so.", "1"])).toEqual({
    slug: "amy-work-panel-editing",
    statement: "A thing is so.",
    to: 1,
  })
})

test("a call naming fewer than three words is refused", () => {
  const said = readIn(["amy-work-panel-editing", "A thing is so."])

  expect(said).toEqual({
    refused: [
      "this takes three words: an initiative, the statement the intent states and the place that intent is to sit at, and 2 arrived",
    ],
  })
})

test("a call naming more than three words is refused", () => {
  const said = readIn(["one", "A thing is so.", "2", "3"])

  expect("refused" in said).toBe(true)
})

test("a statement of no text is refused", () => {
  const said = readIn(["one", "  ", "2"])

  expect(said).toEqual({
    refused: ["the statement said is empty, and an intent is named by the statement it states"],
  })
})

test("a word that is no whole number is no place", () => {
  const said = readIn(["one", "A thing is so.", "first"])

  expect(said).toEqual({
    refused: ["`first` is no place, a place being a whole number counted from one"],
  })
})

test("a place counted from zero is refused", () => {
  const said = readIn(["one", "A thing is so.", "0"])

  expect(said).toEqual({
    refused: ["`0` is no place, a place being a whole number counted from one"],
  })
})

test("both words are judged, so one call says both refusals", () => {
  const said = readIn(["one", " ", "y"])

  expect("refused" in said && said.refused).toHaveLength(2)
})

test("a name that is no initiative is refused in words naming it", () => {
  expect(noInitiative("nowhere")).toBe(
    "`nowhere` names no initiative, so it holds no intents to order"
  )
})

test("the commit says which intent moved and where it went", () => {
  expect(messageFor(ASKED)).toBe("move the intent `A thing is so.` of held to place 1")
})

test("a run says what moved and the commit that run landed", () => {
  expect(saidFor(ASKED, "abc123")).toEqual([
    "held: the intent `A thing is so.` is now at place 1",
    "abc123",
  ])
})

test("a run landing no commit says what moved alone", () => {
  expect(saidFor(ASKED, null)).toEqual(["held: the intent `A thing is so.` is now at place 1"])
})
