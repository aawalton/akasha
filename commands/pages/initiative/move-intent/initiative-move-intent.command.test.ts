import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  carriedBy,
  messageFor,
  noInitiative,
  readIn,
  saidFor,
} from "akasha/commands/pages/initiative/move-intent/initiative-move-intent.command.code.ts"

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

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha initiative move-intent",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const WOULD_NOT = new Error("the value would not be carried onto the place named")

test("a run that landed the move and then threw says that commit", async () => {
  const said = await carriedBy(ASKED, GIVEN, throwingAfter(["abc123"], WOULD_NOT))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run throwing with nothing moved says why it threw and no more", async () => {
  const said = await carriedBy(ASKED, GIVEN, throwingAfter([], WOULD_NOT))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the value would not be carried onto the place named")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote twice names each write where it happened", async () => {
  const wrote = ["the intent was carried onto `Another thing is so.`", "abc123"]
  const said = await carriedBy(ASKED, GIVEN, throwingAfter(wrote, WOULD_NOT))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "the intent was carried onto `Another thing is so.`; abc123. Nothing after that ran."
  )
})
