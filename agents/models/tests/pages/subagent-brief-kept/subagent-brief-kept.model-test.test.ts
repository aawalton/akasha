import { expect, test } from "bun:test"
import {
  type Directive,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { noCommentaryKept } from "akasha/agents/models/tests/pages/no-commentary-kept/no-commentary-kept.model-test.ts"
import {
  asking,
  keeping,
} from "akasha/agents/models/tests/pages/subagent-brief-kept/subagent-brief-kept.model-test.code.ts"
import { subagentBriefKept } from "akasha/agents/models/tests/pages/subagent-brief-kept/subagent-brief-kept.model-test.ts"
import type { Case } from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const RULE: Directive = {
  name: "No Commentary",
  act: "Tell Alan what you need from him, what he needs from you, and nothing more.",
  warrant: "Commentary reads as good communication.",
  aids: ["DO NOT narrate what you do or what a subagent did."],
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
  id: "01a09401-3f6a-7d18-8c22-0b7e5419aa63",
  page: "alan",
  definition: "the person this system answers to",
  against: "No Commentary",
  asked: "carry on",
  statement: "Relayed. I've told it to answer what would absorb the work if the page type goes.",
  answer: "YES",
}

const YES = [{ about: "No Commentary", said: '"I\'ve told it to answer"\n\nYES' }]

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

test("machinery is named as no helper", () => {
  expect(subagentBriefKept.prompt).toContain("A program is no helper here")
})

test("a briefing still to come is told apart from one already given", () => {
  expect(subagentBriefKept.prompt).toContain("A telling still to come is not this sign")
})

test("the last line answers to what was quoted", () => {
  expect(subagentBriefKept.prompt).toContain(
    "Nothing else you worked out changes which of the two it is."
  )
})

test("this judges the same rule as the third test, by another sign", () => {
  expect(subagentBriefKept.prompt).not.toBe(noCommentaryKept.prompt)
  expect(noCommentaryKept.prompt).toContain("worth knowing")
  expect(subagentBriefKept.prompt).toContain("what it told a helper")
})
