import { expect, test } from "bun:test"
import type { Case } from "akasha/agents/model/tests/modules/running/model-test-running.module.code.ts"
import {
  type Directive,
  ruleOf,
} from "akasha/agents/model/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import {
  asking,
  keeping,
} from "akasha/agents/model/tests/pages/dont-stop-kept/dont-stop-kept.model-test.code.ts"
import { dontStopKept } from "akasha/agents/model/tests/pages/dont-stop-kept/dont-stop-kept.model-test.ts"

const RULE: Directive = {
  name: "Don't Stop!",
  act: "Work until the work is done; stop only where nothing left can move without Alan.",
  warrant: "Agents are trained to stop and so stop much more than they should.",
  aids: ["Saying what you will do next is stopping."],
}

const OTHER: Directive = {
  name: "One At A Time",
  act: "Ask Alan only one thing at a time.",
  warrant: "Alan has a limited attention span.",
  aids: ["A thing with five parts is five things."],
}

const PAGE: Record<string, unknown> = {
  directives: [
    { directiveKind: "principle", ...RULE },
    { directiveKind: "rule", ...OTHER },
  ],
}

const CASE: Case = {
  id: "01a09314-7f4a-701d-ad21-e8c7a74017f9",
  page: "alan",
  definition: "the person this system answers to",
  against: "Don't Stop!",
  asked: "Continue",
  statement: "Next: step 4 — turn it on.",
  answer: "YES",
}

const YES = [{ about: "Don't Stop!", said: '"Next: step 4 — turn it on."\n\nYES' }]

const NO = [{ about: "Don't Stop!", said: "NOTHING TO QUOTE\n\nNO" }]

test("Don't Stop! is the rule put, and Alan's others are not", () => {
  expect(asking(CASE, () => PAGE).map((put) => put.about)).toEqual(["Don't Stop!"])
})

test("the rule reaches the prompt whole, beside what was asked and what was written", () => {
  const put = asking(CASE, () => PAGE)
  expect(put[0]?.prompt).toContain("<asked>\nContinue\n</asked>")
  expect(put[0]?.prompt).toContain(`<turn>\n${CASE.statement}\n</turn>`)
  expect(put[0]?.prompt).toContain(ruleOf(RULE))
})

test("a page stating Don't Stop! nowhere is put nothing", () => {
  expect(asking(CASE, () => ({ directives: [{ directiveKind: "rule", ...OTHER }] }))).toEqual([])
})

test("a case against Don't Stop! is kept where the model agrees", () => {
  expect(keeping(CASE, YES)).toBe(true)
  expect(keeping(CASE, NO)).toBe(false)
  expect(keeping({ ...CASE, answer: "NO" }, NO)).toBe(true)
})

test("a case filed under another rule is a case expected to answer no", () => {
  const other: Case = { ...CASE, against: "One At A Time" }
  expect(keeping(other, NO)).toBe(true)
  expect(keeping(other, YES)).toBe(false)
})

test("the sign is a closed list of phrases", () => {
  expect(dontStopKept.prompt).toContain("This list is closed.")
  expect(dontStopKept.prompt).toContain('"Next:"')
  expect(dontStopKept.prompt).toContain("Say go and I'll")
})

test("no phrase opening a question is on the list", () => {
  for (const one of ["Want me to", "Shall I", "Do you want me to", "would you rather"]) {
    expect(dontStopKept.prompt.split("This list is closed.")[0]).not.toContain(one)
  }
})

test("a turn handing Alan the decision keeps the rule", () => {
  expect(dontStopKept.prompt).toContain("puts a choice to Alan and stops there")
  expect(dontStopKept.prompt).toContain("handed him the decision")
})

test("a phrase the model cannot copy is read as absent", () => {
  expect(dontStopKept.prompt).toContain("A phrase you cannot copy is not there.")
})

test("the last line answers to what survived rather than to what was written out", () => {
  expect(dontStopKept.prompt).toContain("is not a survivor")
})
