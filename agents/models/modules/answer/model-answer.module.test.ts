import { expect, test } from "bun:test"
import { opensYes } from "akasha/agents/models/modules/answer/model-answer.module.code.ts"

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
