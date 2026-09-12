import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  droppedBy,
  messageFor,
  noInitiative,
  readIn,
  saidFor,
} from "akasha/commands/pages/initiative/delete-intent/initiative-delete-intent.command.code.ts"

test("two words are read as an initiative and a statement", () => {
  expect(readIn(["amy-harness-improvements", "All of Jenny's widgets work."])).toEqual({
    slug: "amy-harness-improvements",
    statement: "All of Jenny's widgets work.",
  })
})

test("a call naming one word is refused", () => {
  expect(readIn(["amy-harness-improvements"])).toEqual({
    refused: [
      "this takes two words: an initiative and the statement the intent states, and 1 arrived",
    ],
  })
})

test("a call naming three words is refused", () => {
  expect("refused" in readIn(["one", "two", "three"])).toBe(true)
})

test("a statement of no text is refused", () => {
  expect(readIn(["one", "   "])).toEqual({
    refused: ["the statement said is empty, and an intent is named by the statement it states"],
  })
})

test("a statement is read whole rather than trimmed", () => {
  const said = readIn(["one", " padded "])

  expect("refused" in said ? null : said.statement).toBe(" padded ")
})

test("a name that is no initiative is refused in words naming it", () => {
  expect(noInitiative("nowhere")).toBe(
    "`nowhere` names no initiative, so it holds no intents to take one out of"
  )
})

test("the commit says what went and where it went from", () => {
  expect(messageFor({ slug: "held", statement: "A thing is so." })).toBe(
    "take the intent `A thing is so.` out of held"
  )
})

test("a run says what went and the commit that run landed", () => {
  expect(saidFor({ slug: "held", statement: "A thing is so." }, "abc123")).toEqual([
    "held: the intent `A thing is so.` is gone",
    "abc123",
  ])
})

test("a run landing no commit says what went alone", () => {
  expect(saidFor({ slug: "held", statement: "A thing is so." }, null)).toEqual([
    "held: the intent `A thing is so.` is gone",
  ])
})

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha initiative delete-intent",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const HELD = { slug: "held", statement: "A thing is so." }

const GAVE_WAY = new Error("the record would not come out of the page")

test("a run that landed the intent going and then threw says that commit", async () => {
  const said = await droppedBy(HELD, GIVEN, throwingAfter(["abc123"], GAVE_WAY))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run throwing before the intent went says why and nothing more", async () => {
  const said = await droppedBy(HELD, GIVEN, throwingAfter([], GAVE_WAY))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the record would not come out of the page")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote twice names both writes in the order they happened", async () => {
  const wrote = ["the intent was taken out of held", "abc123"]
  const said = await droppedBy(HELD, GIVEN, throwingAfter(wrote, GAVE_WAY))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "the intent was taken out of held; abc123. Nothing after that ran."
  )
})
