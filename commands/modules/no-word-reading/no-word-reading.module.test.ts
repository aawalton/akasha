import { expect, test } from "bun:test"
import { readIn } from "./no-word-reading.module.code.ts"

test("a call saying no word is read as asked", () => {
  expect(readIn([])).toEqual({ asked: true })
})

test("a flag is no word this takes", () => {
  const said = readIn(["--json"])

  expect("refused" in said && said.refused[0]).toContain("`--json`")
})

test("a word carrying no dash is refused too, because this takes no word at all", () => {
  const said = readIn(["seats"])

  expect("refused" in said && said.refused[0]).toContain("`seats`")
})

test("every word said is named in its own refusal, in the order the call said those words", () => {
  const said = readIn(["-h", "--counts"])

  expect("refused" in said && said.refused).toEqual([
    "`-h` is no word this takes — it takes no word at all",
    "`--counts` is no word this takes — it takes no word at all",
  ])
})
