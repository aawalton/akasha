import { expect, test } from "bun:test"
import type { Case } from "akasha/agents/model/tests/modules/running/model-test-running.module.code.ts"
import {
  type Directive,
  ruleOf,
} from "akasha/agents/model/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { dontStopKept } from "akasha/agents/model/tests/pages/dont-stop-kept/dont-stop-kept.model-test.ts"
import {
  asking,
  keeping,
} from "akasha/agents/model/tests/pages/going-on-kept/going-on-kept.model-test.code.ts"
import { goingOnKept } from "akasha/agents/model/tests/pages/going-on-kept/going-on-kept.model-test.ts"

const RULE: Directive = {
  name: "Don't Stop!",
  act: "Work until the work is done; stop only where nothing left can move without Alan.",
  warrant: "Agents are trained to stop and so stop much more than they should.",
  aids: ["Asking whether to go on is stopping."],
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
  id: "01a09b95-1d40-7000-9c21-4f0a7b6e3d15",
  page: "alan",
  definition: "the person this system answers to",
  against: "Don't Stop!",
  asked: "Continue",
  statement: "The credentials fault is mended. Shall I go on to the scopes?",
  answer: "YES",
}

const YES = [{ about: "Don't Stop!", said: '"Shall I go on to the scopes?"\n\nYES' }]

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
  expect(goingOnKept.prompt).toContain("This list is closed.")
  expect(goingOnKept.prompt).toContain('"Shall I go on"')
})

test("a phrase merely close to an entry is named as no match", () => {
  expect(goingOnKept.prompt).toContain("A phrase that is merely close is not the phrase")
  expect(goingOnKept.prompt).toContain('"may I?"')
})

test("leave to begin one settled thing is told apart from a choice between two", () => {
  expect(goingOnKept.prompt).toContain("the only thing missing is leave to begin")
  expect(goingOnKept.prompt).toContain("which of two or three things he wants")
})

test("this judges the same rule as dont-stop-kept, by a second sign", () => {
  expect(goingOnKept.prompt).not.toBe(dontStopKept.prompt)
  expect(dontStopKept.prompt).toContain("naming the work it is about to take up")
  expect(goingOnKept.prompt).toContain("asking Alan leave to carry on")
})
