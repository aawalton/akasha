import { expect, test } from "bun:test"
import type { Judged } from "akasha/agents/models/tests/running/model-test-running.module.code.ts"
import {
  BROKEN,
  CASES,
  JSON_OUT,
  readIn,
  rowOf,
  SHOW,
  scoreOf,
  shownOf,
} from "akasha/commands/pages/model/test/model-test.command.code.ts"

test("the test to score is the word carrying no hyphen", () => {
  const read = readIn(["directive-kept"])
  expect(read).toEqual({ test: "directive-kept", from: null, on: new Set() })
})

test("the cases of another test are taken by name", () => {
  const read = readIn(["directives-kept", CASES, "directive-kept"])
  expect(read).toEqual({ test: "directives-kept", from: "directive-kept", on: new Set() })
})

test("the flags a run takes are gathered", () => {
  const read = readIn(["directive-kept", BROKEN, JSON_OUT])
  expect(read).toEqual({ test: "directive-kept", from: null, on: new Set([BROKEN, JSON_OUT]) })
})

test("naming no test is refused", () => {
  expect(readIn([])).toEqual({ refused: ["a run takes the test to score, and none was named"] })
})

test("naming a second test is refused", () => {
  const read = readIn(["one", "two"])
  expect("refused" in read && read.refused[0]).toContain("a second test")
})

test("a flag a run does not take is refused by name", () => {
  const read = readIn(["one", "--loud"])
  expect("refused" in read && read.refused[0]).toContain("`--loud`")
})

test("naming the cases flag without a test is refused", () => {
  const read = readIn(["one", CASES])
  expect("refused" in read && read.refused[0]).toContain(CASES)
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

test("the show flag is gathered with the rest", () => {
  const read = readIn(["directive-kept", SHOW])
  expect(read).toEqual({ test: "directive-kept", from: null, on: new Set([SHOW]) })
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
