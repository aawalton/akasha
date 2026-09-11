import { expect, test } from "bun:test"
import {
  type Directive,
  directiveKept,
  filling,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"

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
  const asking = directiveKept({ asked: "hold there", turn: "holding", directives: [ONE] })
  expect(asking).toHaveLength(1)
  expect(asking[0]?.prompt).toContain("<asked>\nhold there\n</asked>")
  expect(asking[0]?.prompt).toContain("<turn>\nholding\n</turn>")
  expect(asking[0]?.prompt).toContain(ruleOf(ONE))
})

test("the words put back are the rule's own", () => {
  const asking = directiveKept({ asked: "", turn: "anything", directives: [ONE] })
  expect(asking[0]?.statement).toBe(ruleOf(ONE))
})

test("one rule is put to the model at a time", () => {
  const asking = directiveKept({ asked: "", turn: "anything", directives: [ONE, ONE] })
  expect(asking).toHaveLength(2)
})

test("a sign a value carries is put through unchanged", () => {
  expect(filling("{asked} {turn}", { "{asked}": "{turn}", "{turn}": "written" })).toBe(
    "{turn} written"
  )
})

test("a sign no value is given for is left alone", () => {
  expect(filling("{rule}", {})).toBe("{rule}")
})
