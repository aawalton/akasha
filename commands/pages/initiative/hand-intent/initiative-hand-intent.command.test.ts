import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { fromInitiative } from "akasha/commands/arguments/pages/from-initiative.argument.ts"
import { statement } from "akasha/commands/arguments/pages/statement.argument.ts"
import { toInitiative } from "akasha/commands/arguments/pages/to-initiative.argument.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  handedBy,
  heldAlready,
  initiativeHandIntent,
  manyIntents,
  messageFor,
  noInitiative,
  noIntent,
  recordFor,
  saidFor,
  statingIn,
  wrongIn,
} from "akasha/commands/pages/initiative/hand-intent/initiative-hand-intent.command.code.ts"
import { initiativeHandIntent as page } from "akasha/commands/pages/initiative/hand-intent/initiative-hand-intent.command.ts"

const ASKED = { from: "one", statement: "A thing is so.", to: "two" }

function rowOf(
  slug: string,
  intents: readonly { statement: string; workingMemory: string | null }[]
) {
  return { slug, path: `${slug}.initiative.ts`, parent: null, persona: null, intents }
}

test("a call naming four words is refused", async () => {
  const said = await initiativeHandIntent(["one", "two", "three", "four"], GIVEN)

  expect(said.refusals).toEqual([
    "`akasha initiative hand-intent` takes 3 words and this call says 4 words",
  ])
})

test("a statement of no text is refused", () => {
  expect(wrongIn({ ...ASKED, statement: "  " })).toEqual([
    "the statement said is empty, and an intent is named by the statement it states",
  ])
})

test("an initiative handing an intent to itself is refused", () => {
  expect(wrongIn({ ...ASKED, to: ASKED.from })).toEqual([
    "`one` is named twice, and an intent is handed to another initiative",
  ])
})

test("a name that is no initiative is refused in words naming it", () => {
  expect(noInitiative("nowhere")).toBe("`nowhere` names no initiative")
})

test("a statement no intent states is refused in words naming both", () => {
  expect(noIntent(ASKED)).toBe("no intent of `one` states `A thing is so.`")
})

test("a statement more than one intent states is refused, saying how many", () => {
  expect(manyIntents(ASKED, 2)).toBe(
    "2 intents of `one` state `A thing is so.`, and one run hands one over"
  )
})

test("a statement the initiative taking it already states is refused", () => {
  expect(heldAlready(ASKED)).toBe("`two` states an intent saying `A thing is so.` already")
})

test("the intents of one initiative stating the text are found", () => {
  const row = rowOf("one", [
    { statement: "A thing is so.", workingMemory: null },
    { statement: "Another thing is so.", workingMemory: null },
  ])

  expect(statingIn(row, "A thing is so.")).toEqual([
    { statement: "A thing is so.", workingMemory: null },
  ])
})

test("an intent with working memory is written with that memory", () => {
  expect(recordFor({ statement: "A thing is so.", workingMemory: "What is left." })).toBe(
    '{ statement: "A thing is so.", workingMemory: "What is left." }'
  )
})

test("an intent with no working memory is written with none", () => {
  expect(recordFor({ statement: "A thing is so.", workingMemory: null })).toBe(
    '{ statement: "A thing is so." }'
  )
})

test("a statement carrying a quote is written so the record still parses", () => {
  expect(recordFor({ statement: 'He said "no".', workingMemory: null })).toBe(
    '{ statement: "He said \\"no\\"." }'
  )
})

test("the commit says which intent went where", () => {
  expect(messageFor(ASKED)).toBe("hand the intent `A thing is so.` from one to two")
})

test("a run says which initiative has the intent now and the commit that landed", () => {
  expect(saidFor(ASKED, "abc123")).toEqual([
    "two states the intent `A thing is so.`, and one no longer does",
    "abc123",
  ])
})

test("a run landing no commit says what moved alone", () => {
  expect(saidFor(ASKED, null)).toEqual([
    "two states the intent `A thing is so.`, and one no longer does",
  ])
})

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha initiative hand-intent",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const FELL = new Error("the change runner fell over")

test("each word lands on the argument sitting at its place in `arguments`", () => {
  const read = takenFor([ASKED.from, ASKED.statement, ASKED.to], GIVEN.calledAs, page, [
    fromInitiative,
    statement,
    toInitiative,
  ])

  expect(read).toEqual({
    taken: { fromInitiative: ASKED.from, statement: ASKED.statement, toInitiative: ASKED.to },
  })
})

test("a run that landed the commit and then threw says that commit in its refusal", async () => {
  const said = await handedBy(ASKED, GIVEN, throwingAfter(["abc123"], FELL))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it wrote says the fault alone", async () => {
  const said = await handedBy(ASKED, GIVEN, throwingAfter([], FELL))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the change runner fell over")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote both pages names each of them in the order they were written", async () => {
  const wrote = ["the intent was put onto two", "the intent was taken out of one"]
  const said = await handedBy(ASKED, GIVEN, throwingAfter(wrote, FELL))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "the intent was put onto two; the intent was taken out of one. Nothing after that ran."
  )
})
