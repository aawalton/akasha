import { expect, test } from "bun:test"
import type { Case } from "akasha/agent/model/test/modules/running/model-test-running.module.code.ts"
import {
  asking,
  keeping,
  promptFor,
} from "akasha/agent/model/test/pages/needs-attention/needs-attention.model-test.code.ts"

const CASE: Case = {
  id: "01a0deef-c35a-7000-a13e-e3f0ea2d411e",
  page: "alan",
  definition: "the person this system answers to",
  asked: "go on",
  statement: "Shall I land the hook?",
  answer: "YES",
}

const YES = [{ about: "needs-attention", said: '"Shall I land the hook?"\n\nYES' }]

const NO = [{ about: "needs-attention", said: "NOTHING TO QUOTE\n\nNO" }]

test("what Alan asked is put beside what the agent wrote back", () => {
  const prompt = promptFor("go on", "Shall I land the hook?")
  expect(prompt).toContain("<asked>\ngo on\n</asked>")
  expect(prompt).toContain("<turn>\nShall I land the hook?\n</turn>")
})

test("a case naming nothing Alan asked is put with that block empty", () => {
  const bare: Case = {
    id: CASE.id,
    page: CASE.page,
    definition: CASE.definition,
    statement: CASE.statement,
    answer: CASE.answer,
  }
  expect(asking(bare)[0]?.prompt).toContain("<asked>\n\n</asked>")
})

test("each case is put once, whatever rules Alan states", () => {
  expect(asking(CASE).map((put) => put.about)).toEqual(["needs-attention"])
})

test("a case is kept where the model agrees with its answer", () => {
  expect(keeping(CASE, YES)).toBe(true)
  expect(keeping(CASE, NO)).toBe(false)
  expect(keeping({ ...CASE, answer: "NO" }, NO)).toBe(true)
  expect(keeping({ ...CASE, answer: "NO" }, YES)).toBe(false)
})
