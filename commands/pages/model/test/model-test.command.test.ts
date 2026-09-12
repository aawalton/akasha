import { expect, test } from "bun:test"
import type { Judged } from "akasha/agents/models/tests/running/model-test-running.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  modelTest,
  rowOf,
  scoreOf,
  shownOf,
} from "akasha/commands/pages/model/test/model-test.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha model test",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("naming no test is refused", async () => {
  const said = await modelTest([], GIVEN)

  expect(said.refusals).toEqual(["`akasha model test` takes `<test>`, and nothing said it"])
})

test("naming a second test is refused", async () => {
  const said = await modelTest(["one", "two"], GIVEN)

  expect(said.refusals[0]).toBe(
    "`akasha model test` takes 1 word and this call says 2 words — nothing takes `two`"
  )
})

test("a flag a run does not take is refused by name", async () => {
  const said = await modelTest(["one", "--loud"], GIVEN)

  expect(said.refusals[0]).toContain("`--loud`")
})

test("naming the cases flag without a test is refused", async () => {
  const said = await modelTest(["one", "--cases"], GIVEN)

  expect(said.refusals[0]).toBe("`--cases` takes a value, and none follows it")
})

const ONE: Judged = {
  one: {
    id: "01a09149-86b8-7a49-b3a0-96f054359ff3",
    page: "alan",
    definition: "the person this system answers to",
    against: "Don't Stop!",
    statement: "Shall I go on?",
    answer: "YES",
  },
  asked: [
    { about: "Act By Default", prompt: "put for Act By Default" },
    { about: "Don't Stop!", prompt: "put for Don't Stop!" },
  ],
  got: [
    { about: "Act By Default", said: "NO" },
    { about: "Don't Stop!", said: "YES" },
  ],
  kept: true,
  reached: true,
}

test("a row says whether the case was kept, what was wanted and what each rule said", () => {
  expect(rowOf(ONE)).toBe(
    "kept\tDon't Stop!\tYES\tAct By Default=NO | Don't Stop!=YES\tShall I go on?"
  )
})

test("a case nothing could be asked of says so in place of an answer", () => {
  expect(rowOf({ ...ONE, kept: false, reached: false, got: [] })).toContain("unreached")
})

test("the score counts the cases kept out of every case", () => {
  expect(scoreOf([ONE, { ...ONE, kept: false }])).toBe("kept\t1 of 2")
})

test("showing a case gives the whole prompt put and the whole answer back", () => {
  expect(shownOf(ONE)).toEqual([
    "broke\t01a09149-86b8-7a49-b3a0-96f054359ff3".replace("broke", "kept"),
    "--- put about Act By Default",
    "put for Act By Default",
    "--- said about Act By Default",
    "NO",
    "--- put about Don't Stop!",
    "put for Don't Stop!",
    "--- said about Don't Stop!",
    "YES",
  ])
})

test("showing a case nothing was asked of says so", () => {
  expect(shownOf({ ...ONE, asked: [], got: [], kept: false, reached: false })).toEqual([
    "broke\t01a09149-86b8-7a49-b3a0-96f054359ff3",
    "--- unreached",
  ])
})
