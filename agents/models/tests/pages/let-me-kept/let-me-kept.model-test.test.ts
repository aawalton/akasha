import { expect, test } from "bun:test"
import type { Case } from "akasha/agents/models/tests/modules/running/model-test-running.module.code.ts"
import {
  type Directive,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { dontStopKept } from "akasha/agents/models/tests/pages/dont-stop-kept/dont-stop-kept.model-test.ts"
import { goingOnKept } from "akasha/agents/models/tests/pages/going-on-kept/going-on-kept.model-test.ts"
import {
  asking,
  keeping,
} from "akasha/agents/models/tests/pages/let-me-kept/let-me-kept.model-test.code.ts"
import { letMeKept } from "akasha/agents/models/tests/pages/let-me-kept/let-me-kept.model-test.ts"

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
  id: "01a09c25-0a11-7000-b3d8-6e2f1c94a7b0",
  page: "alan",
  definition: "the person this system answers to",
  against: "Don't Stop!",
  asked: "Continue",
  statement: "Let me read the change types before I name anything.",
  answer: "YES",
}

const YES = [{ about: "Don't Stop!", said: '"Let me read the change types"\n\nYES' }]

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
  expect(letMeKept.prompt).toContain("This list is closed.")
  expect(letMeKept.prompt).toContain('"Let me read"')
})

test("an entry is matched whole rather than by a word out of it", () => {
  expect(letMeKept.prompt).toContain("Each entry is the whole phrase and not a word out of it")
  expect(letMeKept.prompt).toContain('is not matched by "reading"')
})

test("the model writes the entry beside the turn's own words", () => {
  expect(letMeKept.prompt).toContain("write the entry from the list and then the same words")
})

test("an act named and then shown done was not left named", () => {
  expect(letMeKept.prompt).toContain("A thing named and then shown done was not left named.")
})

test("three signs read one rule, each by its own", () => {
  expect(letMeKept.prompt).not.toBe(dontStopKept.prompt)
  expect(letMeKept.prompt).not.toBe(goingOnKept.prompt)
  expect(dontStopKept.prompt).toContain("naming the work it is about to take up")
  expect(goingOnKept.prompt).toContain("asking Alan leave to carry on")
  expect(letMeKept.prompt).toContain("announcing an act the agent was free to perform")
})
