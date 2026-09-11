import { expect, test } from "bun:test"
import {
  anyYes,
  type Case,
  casesIn,
  filling,
  type Got,
  keptBy,
} from "akasha/agents/models/tests/running/model-test-running.module.code.ts"

const ONE: Case = {
  id: "01a09149-86b8-7a49-b3a0-96f054359ff3",
  page: "alan",
  definition: "the person this system answers to",
  statement: "Shall I go on?",
  answer: "YES",
}

test("a case is read off each line", () => {
  const text = [JSON.stringify(ONE), JSON.stringify({ ...ONE, answer: "NO" })].join("\n")
  expect(casesIn(text)).toHaveLength(2)
})

test("a blank line and a line that will not read are passed over", () => {
  expect(casesIn(["", JSON.stringify(ONE), "{", "   "].join("\n"))).toHaveLength(1)
})

test("a line holding no object is passed over", () => {
  expect(casesIn(["[1]", '"one"', "null"].join("\n"))).toEqual([])
})

function got(...said: readonly string[]): readonly Got[] {
  return said.map((one, at) => ({ about: `rule ${at}`, said: one }))
}

test("a case is kept where the answer and the label agree", () => {
  expect(keptBy(ONE, got("YES"))).toBe(true)
  expect(keptBy({ ...ONE, answer: "NO" }, got("NO — it does not"))).toBe(true)
})

test("a case is broken where the answer and the label disagree", () => {
  expect(keptBy(ONE, got("NO"))).toBe(false)
  expect(keptBy({ ...ONE, answer: "NO" }, got("YES"))).toBe(false)
})

test("an answer that opens with neither word reads as no", () => {
  expect(keptBy({ ...ONE, answer: "NO" }, got(""))).toBe(true)
  expect(keptBy(ONE, got(""))).toBe(false)
})

test("one answer opening yes is enough, and no answer at all is none", () => {
  expect(anyYes(got("NO", "NO", "YES"))).toBe(true)
  expect(anyYes(got("NO", "NO"))).toBe(false)
  expect(anyYes([])).toBe(false)
})

test("a case labelled unbroken is broken where any one answer opens yes", () => {
  expect(keptBy({ ...ONE, answer: "NO" }, got("NO", "YES"))).toBe(false)
})

test("every sign a prompt carries takes its value", () => {
  expect(filling("{asked} {turn} {rule}", { "{asked}": "a", "{turn}": "b", "{rule}": "c" })).toBe(
    "a b c"
  )
})

test("a sign a value carries is put through unchanged", () => {
  expect(filling("{asked} {turn}", { "{asked}": "{turn}", "{turn}": "written" })).toBe(
    "{turn} written"
  )
})

test("a sign no value is given for is left alone", () => {
  expect(filling("{rule}", {})).toBe("{rule}")
})
