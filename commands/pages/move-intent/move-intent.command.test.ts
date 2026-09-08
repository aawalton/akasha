import { expect, test } from "bun:test"
import { messageFor, noInitiative, readIn, saidFor } from "./move-intent.command.code.ts"

test("three words are read as an initiative and two places", () => {
  expect(readIn(["amy-work-panel-editing", "2", "1"])).toEqual({
    slug: "amy-work-panel-editing",
    from: 2,
    to: 1,
  })
})

test("a call naming fewer than three words is refused", () => {
  const said = readIn(["amy-work-panel-editing", "2"])

  expect(said).toEqual({
    refused: [
      "this takes three words: an initiative, the place moved from and the place moved to, and 2 arrived",
    ],
  })
})

test("a call naming more than three words is refused", () => {
  const said = readIn(["one", "1", "2", "3"])

  expect("refused" in said).toBe(true)
})

test("a word that is no whole number is no place", () => {
  const said = readIn(["one", "first", "2"])

  expect(said).toEqual({
    refused: ["`first` is no place, a place being a whole number counted from one"],
  })
})

test("a place counted from zero is refused", () => {
  const said = readIn(["one", "0", "2"])

  expect(said).toEqual({
    refused: ["`0` is no place, a place being a whole number counted from one"],
  })
})

test("both words are judged, so one call says both refusals", () => {
  const said = readIn(["one", "x", "y"])

  expect("refused" in said && said.refused).toHaveLength(2)
})

test("a name that is no initiative is refused in words naming it", () => {
  expect(noInitiative("nowhere")).toBe(
    "`nowhere` names no initiative, so it holds no intents to order"
  )
})

test("the commit says what moved and where it went", () => {
  expect(messageFor({ slug: "held", from: 3, to: 1 })).toBe("move held intent 3 to place 1")
})

test("a run says what moved and the commit that run landed", () => {
  expect(saidFor({ slug: "held", from: 3, to: 1 }, "abc123")).toEqual([
    "held: the intent at place 3 is now at place 1",
    "abc123",
  ])
})

test("a run landing no commit says what moved alone", () => {
  expect(saidFor({ slug: "held", from: 3, to: 1 }, null)).toEqual([
    "held: the intent at place 3 is now at place 1",
  ])
})
