import { expect, test } from "bun:test"
import {
  asking,
  type Directive,
  directiveKept,
  directivesIn,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import type { Case } from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const ONE: Directive = {
  name: "Act By Default",
  act: "Act on what is in front of you.",
  warrant: "Asking spends attention.",
  aids: ["When Alan asks you to hold there, hold there."],
}

test("a rule is put whole, with its warrant and its aids", () => {
  expect(ruleOf(ONE)).toBe(
    "Act By Default: Act on what is in front of you.\nAsking spends attention.\n- When Alan asks you to hold there, hold there."
  )
})

test("what Alan asked, what the agent wrote and the rule all reach the prompt", () => {
  const put = directiveKept({ asked: "hold there", turn: "holding", directives: [ONE] })
  expect(put).toHaveLength(1)
  expect(put[0]?.prompt).toContain("<asked>\nhold there\n</asked>")
  expect(put[0]?.prompt).toContain("<turn>\nholding\n</turn>")
  expect(put[0]?.prompt).toContain(ruleOf(ONE))
})

test("the words put back are the rule's own", () => {
  const put = directiveKept({ asked: "", turn: "anything", directives: [ONE] })
  expect(put[0]?.statement).toBe(ruleOf(ONE))
})

test("one rule is put to the model at a time", () => {
  const put = directiveKept({ asked: "", turn: "anything", directives: [ONE, ONE] })
  expect(put).toHaveLength(2)
})

test("a whole directive is read", () => {
  const held = directivesIn([
    { directiveKind: "rule", name: "One", act: "Do it.", warrant: "Because.", aids: ["An aid."] },
  ])
  expect(held).toEqual([{ name: "One", act: "Do it.", warrant: "Because.", aids: ["An aid."] }])
})

test("a directive missing a field is passed over", () => {
  expect(directivesIn([{ name: "One", act: "Do it.", warrant: "Because." }])).toEqual([])
  expect(directivesIn([{ name: "One", act: "Do it.", aids: [] }])).toEqual([])
  expect(directivesIn([{ act: "Do it.", warrant: "Because.", aids: [] }])).toEqual([])
})

test("a directive whose aids are not all text is passed over", () => {
  expect(directivesIn([{ name: "One", act: "A.", warrant: "B.", aids: ["ok", 1] }])).toEqual([])
})

test("anything that is no list of directives reads as none", () => {
  expect(directivesIn(undefined)).toEqual([])
  expect(directivesIn(null)).toEqual([])
  expect(directivesIn("directives")).toEqual([])
  expect(directivesIn([null, 1, "one"])).toEqual([])
})

const CASE: Case = {
  id: "01a09149-86b8-7a49-b3a0-96f054359ff3",
  page: "alan",
  definition: "the person this system answers to",
  against: "Act By Default",
  asked: "hold there",
  statement: "holding",
  answer: "NO",
}

const TWO: Directive = {
  name: "Don't Stop!",
  act: "Work until the work is done.",
  warrant: "Agents stop too much.",
  aids: ["Reporting progress is stopping."],
}

const PAGE: Record<string, unknown> = {
  directives: [
    { directiveKind: "principle", ...ONE },
    { directiveKind: "principle", ...TWO },
  ],
}

test("every rule the page states is put for one case, each on its own", () => {
  expect(asking(CASE, () => PAGE).map((put) => put.about)).toEqual([
    "Act By Default",
    "Don't Stop!",
  ])
})

test("a case carries what was asked, what was written and the rule put", () => {
  const put = asking(CASE, () => PAGE)
  expect(put[0]?.prompt).toContain("<asked>\nhold there\n</asked>")
  expect(put[0]?.prompt).toContain("<turn>\nholding\n</turn>")
  expect(put[0]?.prompt).toContain(ruleOf(ONE))
  expect(put[1]?.prompt).toContain(ruleOf(TWO))
})

test("a case naming nothing asked is put with that block empty", () => {
  expect(asking({ ...CASE, asked: undefined }, () => PAGE)[0]?.prompt).toContain(
    "<asked>\n\n</asked>"
  )
})

test("a case naming a page that is not there is put to nothing", () => {
  expect(asking(CASE, () => null)).toEqual([])
})

test("the rule a case names does not narrow what is put", () => {
  expect(asking({ ...CASE, against: "No Such Rule" }, () => PAGE)).toHaveLength(2)
})
