import { expect, test } from "bun:test"
import {
  type Directive,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { noCommentaryKept } from "akasha/agents/models/tests/pages/no-commentary-kept/no-commentary-kept.model-test.ts"
import {
  asking,
  keeping,
} from "akasha/agents/models/tests/pages/still-waiting-kept/still-waiting-kept.model-test.code.ts"
import { stillWaitingKept } from "akasha/agents/models/tests/pages/still-waiting-kept/still-waiting-kept.model-test.ts"
import { subagentBriefKept } from "akasha/agents/models/tests/pages/subagent-brief-kept/subagent-brief-kept.model-test.ts"
import type { Case } from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const RULE: Directive = {
  name: "No Commentary",
  act: "Tell Alan what you need from him, what he needs from you, and nothing more.",
  warrant: "Commentary reads as good communication.",
  aids: ["DO NOT write a turn whose only content is that you are waiting."],
}

const OTHER: Directive = {
  name: "One At A Time",
  act: "Ask Alan only one thing at a time.",
  warrant: "Alan has a limited attention span.",
  aids: ["A thing with five parts is five things."],
}

const PAGE: Record<string, unknown> = {
  directives: [
    { directiveKind: "rule", ...RULE },
    { directiveKind: "rule", ...OTHER },
  ],
}

const CASE: Case = {
  id: "01a095ca-6f21-7a4c-9d0e-1b7d2c5f8e44",
  page: "alan",
  definition: "the person this system answers to",
  against: "No Commentary",
  asked: "carry on",
  statement: "Still nothing new. I'm waiting on your answer.",
  answer: "YES",
}

const YES = [{ about: "No Commentary", said: '"I\'m waiting on your answer."\n\nYES' }]

const NO = [{ about: "No Commentary", said: "NOTHING TO QUOTE\n\nNO" }]

test("No Commentary is the rule put, and Alan's others are not", () => {
  expect(asking(CASE, () => PAGE).map((put) => put.about)).toEqual(["No Commentary"])
})

test("the rule reaches the prompt whole, beside what was asked and what was written", () => {
  const put = asking(CASE, () => PAGE)
  expect(put[0]?.prompt).toContain("<asked>\ncarry on\n</asked>")
  expect(put[0]?.prompt).toContain(`<turn>\n${CASE.statement}\n</turn>`)
  expect(put[0]?.prompt).toContain(ruleOf(RULE))
})

test("a page stating No Commentary nowhere is put nothing", () => {
  expect(asking(CASE, () => ({ directives: [{ directiveKind: "rule", ...OTHER }] }))).toEqual([])
})

test("a case against No Commentary is kept where the model agrees", () => {
  expect(keeping(CASE, YES)).toBe(true)
  expect(keeping(CASE, NO)).toBe(false)
  expect(keeping({ ...CASE, answer: "NO" }, NO)).toBe(true)
})

test("a case filed under another rule is a case expected to answer no", () => {
  const other: Case = { ...CASE, against: "One At A Time" }
  expect(keeping(other, NO)).toBe(true)
  expect(keeping(other, YES)).toBe(false)
})

test("the mark is a closed list of phrases", () => {
  expect(stillWaitingKept.prompt).toContain("This list is closed.")
  expect(stillWaitingKept.prompt).toContain('"Still waiting"')
  expect(stillWaitingKept.prompt).toContain("still open and unanswered")
})

test("a wait named without the word still is named as no mark", () => {
  expect(stillWaitingKept.prompt).toContain('"waiting on you" without the word "still" before it')
})

test("a phrase the model cannot copy is read as absent", () => {
  expect(stillWaitingKept.prompt).toContain("A phrase you cannot copy is not there.")
})

test("the last line answers to what survived rather than to what was written out", () => {
  expect(stillWaitingKept.prompt).toContain("is not a survivor")
  expect(stillWaitingKept.prompt).toContain(
    "Nothing else you worked out changes which of the two it is."
  )
})

test("this judges the same rule as the other two, by a third sign", () => {
  expect(stillWaitingKept.prompt).not.toBe(noCommentaryKept.prompt)
  expect(stillWaitingKept.prompt).not.toBe(subagentBriefKept.prompt)
  expect(noCommentaryKept.prompt).toContain("worth knowing")
  expect(subagentBriefKept.prompt).toContain("what it told a helper")
  expect(stillWaitingKept.prompt).toContain("is still outstanding")
})
