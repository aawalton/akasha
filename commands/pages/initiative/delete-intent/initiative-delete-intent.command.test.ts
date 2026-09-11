import { expect, test } from "bun:test"
import {
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
