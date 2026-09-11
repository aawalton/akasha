import { expect, test } from "bun:test"
import { endsYes, opensYes } from "akasha/agents/models/modules/answer/model-answer.module.code.ts"

test("an answer opening with yes is a yes", () => {
  expect(opensYes("YES")).toBe(true)
  expect(opensYes("YES, it does.")).toBe(true)
})

test("an answer is read whatever case it is written in", () => {
  expect(opensYes("yes")).toBe(true)
  expect(opensYes("Yes.")).toBe(true)
})

test("what is no letter is passed over before the opening is read", () => {
  expect(opensYes("**YES**")).toBe(true)
  expect(opensYes(" \n YES")).toBe(true)
})

test("an answer opening with anything else is no yes", () => {
  expect(opensYes("NO")).toBe(false)
  expect(opensYes("")).toBe(false)
  expect(opensYes("It breaks nothing, so yes is wrong")).toBe(false)
})

test("an answer whose last line is yes alone is a yes", () => {
  expect(endsYes('"a few lines"\n\nYES')).toBe(true)
  expect(endsYes("NOTHING TO QUOTE\n\nNO")).toBe(false)
})

test("a last line holding anything besides yes is no", () => {
  expect(endsYes("YES\nthen it went on")).toBe(false)
  expect(endsYes("it answers YES, it does")).toBe(false)
  expect(endsYes("")).toBe(false)
})

test("a last line is read whatever case and marks it carries", () => {
  expect(endsYes("quoted\n**yes**")).toBe(true)
  expect(endsYes("quoted\n yes. \n \n")).toBe(true)
})
