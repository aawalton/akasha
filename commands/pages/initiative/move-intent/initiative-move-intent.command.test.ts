import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { initiative } from "akasha/commands/arguments/pages/initiative.argument.ts"
import { onto } from "akasha/commands/arguments/pages/onto.argument.ts"
import { statement } from "akasha/commands/arguments/pages/statement.argument.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Asked,
  carriedBy,
  initiativeMoveIntent,
  messageFor,
  noInitiative,
  saidFor,
  wrongIn,
} from "akasha/commands/pages/initiative/move-intent/initiative-move-intent.command.code.ts"
import { initiativeMoveIntent as page } from "akasha/commands/pages/initiative/move-intent/initiative-move-intent.command.ts"

const ASKED: Asked = { slug: "held", statement: "A thing is so.", onto: "Another thing is so." }

test("a call naming more than three words is refused", async () => {
  const said = await initiativeMoveIntent(["one", "two", "three", "four"], GIVEN)

  expect(said.refusals).toEqual([
    "`akasha initiative move-intent` takes 3 words and this call says 4 words — " +
      "nothing takes `four`",
  ])
})

test("a statement of no text is refused", () => {
  expect(wrongIn({ ...ASKED, statement: "  " })).toEqual([
    "the statement said is empty, and an intent is named by the statement it states",
  ])
})

test("an intent moved onto nothing is refused", () => {
  expect(wrongIn({ ...ASKED, onto: " " })).toEqual([
    "the intent moved onto is said as nothing, and an intent is named by the statement it states",
  ])
})

test("an intent moved onto itself is refused", () => {
  expect(wrongIn({ ...ASKED, onto: ASKED.statement })).toEqual([
    "an intent moved onto itself moves nowhere",
  ])
})

test("both words are judged, so one call says both refusals", () => {
  expect(wrongIn({ ...ASKED, statement: " ", onto: "  " })).toHaveLength(2)
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

test("each word lands on the argument sitting at its place in `arguments`", () => {
  const read = takenFor([ASKED.slug, ASKED.statement, ASKED.onto], GIVEN.calledAs, page, [
    initiative,
    statement,
    onto,
  ])

  expect(read).toEqual({
    taken: { initiative: ASKED.slug, statement: ASKED.statement, onto: ASKED.onto },
  })
})

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
