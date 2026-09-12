import { expect, test } from "bun:test"
import {
  type Directive,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import {
  asking,
  keeping,
} from "akasha/agents/models/tests/pages/one-at-a-time-kept/one-at-a-time-kept.model-test.code.ts"
import { oneAtATimeKept } from "akasha/agents/models/tests/pages/one-at-a-time-kept/one-at-a-time-kept.model-test.ts"
import type { Case } from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const RULE: Directive = {
  name: "One At A Time",
  act: "Ask Alan only one thing at a time: one question, one approval, or one task.",
  warrant: "Alan has a limited attention span.",
  aids: ["A thing with five parts is five things."],
}

const OTHER: Directive = {
  name: "No Commentary",
  act: "Tell Alan what you need from him and nothing more.",
  warrant: "Commentary spends Alan's attention.",
  aids: ["DO put your question in the last line."],
}

const PAGE: Record<string, unknown> = {
  directives: [
    { directiveKind: "rule", ...RULE },
    { directiveKind: "rule", ...OTHER },
  ],
}

const CASE: Case = {
  id: "01a0937a-4d51-7c02-b5e6-1c2f8a90d3b4",
  page: "alan",
  definition: "the person this system answers to",
  against: "One At A Time",
  asked: "go on",
  statement: "Two questions before I build it.",
  answer: "YES",
}

const YES = [{ about: "One At A Time", said: '"Two questions before I build it."\n\nYES' }]

const NO = [{ about: "One At A Time", said: "NOTHING TO QUOTE\n\nNO" }]

test("One At A Time is the rule put, and Alan's others are not", () => {
  expect(asking(CASE, () => PAGE).map((put) => put.about)).toEqual(["One At A Time"])
})

test("the rule reaches the prompt whole, beside what was asked and what was written", () => {
  const put = asking(CASE, () => PAGE)
  expect(put[0]?.prompt).toContain("<asked>\ngo on\n</asked>")
  expect(put[0]?.prompt).toContain("<turn>\nTwo questions before I build it.\n</turn>")
  expect(put[0]?.prompt).toContain(ruleOf(RULE))
})

test("a page stating One At A Time nowhere is put nothing", () => {
  expect(asking(CASE, () => ({ directives: [{ directiveKind: "rule", ...OTHER }] }))).toEqual([])
})

test("a case against One At A Time is kept where the model agrees", () => {
  expect(keeping(CASE, YES)).toBe(true)
  expect(keeping(CASE, NO)).toBe(false)
  expect(keeping({ ...CASE, answer: "NO" }, NO)).toBe(true)
})

test("a case filed under another rule is a case expected to answer no", () => {
  const other: Case = { ...CASE, against: "No Commentary" }
  expect(keeping(other, NO)).toBe(true)
  expect(keeping(other, YES)).toBe(false)
})

test("the narrow sign looked for is the turn counting what it wants from Alan", () => {
  expect(oneAtATimeKept.prompt).toContain(
    "the turn announcing, in its own words, that it wants more than one thing from him"
  )
})

test("turns already judged are put to the model with the judgement on each", () => {
  expect(oneAtATimeKept.prompt).toContain("Five turns already judged, to calibrate you:")
})

test("what Alan asked settles the answer, said again after the ordered steps", () => {
  const steps = oneAtATimeKept.prompt.indexOf("Fifth, if no count survives")
  const settles = oneAtATimeKept.prompt.indexOf("One thing settles it on its own")
  expect(steps).toBeGreaterThan(0)
  expect(settles).toBeGreaterThan(steps)
})
