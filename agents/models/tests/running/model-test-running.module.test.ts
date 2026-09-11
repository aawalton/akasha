import { expect, test } from "bun:test"
import {
  type Case,
  casesIn,
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

test("a case is kept where the answer and the label agree", () => {
  expect(keptBy(ONE, "YES")).toBe(true)
  expect(keptBy({ ...ONE, answer: "NO" }, "NO — it does not")).toBe(true)
})

test("a case is broken where the answer and the label disagree", () => {
  expect(keptBy(ONE, "NO")).toBe(false)
  expect(keptBy({ ...ONE, answer: "NO" }, "YES")).toBe(false)
})

test("an answer that opens with neither word reads as no", () => {
  expect(keptBy({ ...ONE, answer: "NO" }, "")).toBe(true)
  expect(keptBy(ONE, "")).toBe(false)
})
