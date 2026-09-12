import { expect, test } from "bun:test"
import {
  type Directive,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import {
  asking,
  keeping,
} from "akasha/agents/models/tests/pages/no-commentary-kept/no-commentary-kept.model-test.code.ts"
import { noCommentaryKept } from "akasha/agents/models/tests/pages/no-commentary-kept/no-commentary-kept.model-test.ts"
import type { Case } from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const RULE: Directive = {
  name: "No Commentary",
  act: "Tell Alan what you need from him, what he needs from you, and nothing more.",
  warrant: "Commentary reads as good communication.",
  aids: ["DO put your question in the last line."],
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
  id: "01a093c8-71e2-7b40-9a15-6d8e0f2c4471",
  page: "alan",
  definition: "the person this system answers to",
  against: "No Commentary",
  asked: "carry on",
  statement: "Landed. Also worth knowing: the drop took five kept edits, and I left it alone.",
  answer: "YES",
}

const YES = [{ about: "No Commentary", said: '"Also worth knowing"\n\nYES' }]

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

test("the phrases marking an aside are given as a closed list", () => {
  expect(noCommentaryKept.prompt).toContain("This list is closed.")
  expect(noCommentaryKept.prompt).toContain('"worth your eye"')
})

test("a phrase the model cannot copy out of the turn counts as absent", () => {
  expect(noCommentaryKept.prompt).toContain("A phrase you cannot copy is not there.")
})

test("the guard settling the answer alone sits after the ordered steps", () => {
  const steps = noCommentaryKept.prompt.indexOf("Fourth, if nothing survives")
  const settles = noCommentaryKept.prompt.indexOf("settles the whole thing on its own")
  expect(steps).toBeGreaterThan(0)
  expect(settles).toBeGreaterThan(steps)
})
