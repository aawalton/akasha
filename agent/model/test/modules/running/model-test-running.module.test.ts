import { expect, test } from "bun:test"
import {
  anyYes,
  type Case,
  filling,
  type Got,
  gotIn,
  parseCases,
} from "akasha/agent/model/test/modules/running/model-test-running.module.code.ts"

const ONE: Case = {
  id: "01a09149-86b8-7a49-b3a0-96f054359ff3",
  page: "alan",
  definition: "the person this system answers to",
  statement: "Shall I go on?",
  answer: "YES",
}

test("a case is read off each line", () => {
  const text = [JSON.stringify(ONE), JSON.stringify({ ...ONE, answer: "NO" })].join("\n")
  expect(parseCases(text)).toHaveLength(2)
})

test("a blank line and a line that will not read are passed over", () => {
  expect(parseCases(["", JSON.stringify(ONE), "{", "   "].join("\n"))).toHaveLength(1)
})

test("a line holding no object is passed over", () => {
  expect(parseCases(["[1]", '"one"', "null"].join("\n"))).toEqual([])
})

function got(...said: readonly string[]): readonly Got[] {
  return said.map((one, at) => ({ about: `rule ${at}`, said: one }))
}

test("one answer opening yes is enough, and no answer at all is none", () => {
  expect(anyYes(got("NO", "NO", "YES"))).toBe(true)
  expect(anyYes(got("NO", "NO"))).toBe(false)
  expect(anyYes([])).toBe(false)
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

const ASKED = [
  { about: "first", prompt: "one" },
  { about: "second", prompt: "two" },
]

test("a case's answers are read from where its prompts opened in the job", () => {
  expect(gotIn(ASKED, ["other", "NO", "YES"], 1)).toEqual([
    { about: "first", said: "NO" },
    { about: "second", said: "YES" },
  ])
})

test("a case any of whose prompts reached no model is judged by nothing", () => {
  expect(gotIn(ASKED, ["NO", null], 0)).toBeNull()
  expect(gotIn(ASKED, ["NO"], 0)).toBeNull()
})

test("a case whose prompts all answered is judged though another case's reached no model", () => {
  expect(gotIn(ASKED, [null, "NO", "NO"], 1)).toHaveLength(2)
})
