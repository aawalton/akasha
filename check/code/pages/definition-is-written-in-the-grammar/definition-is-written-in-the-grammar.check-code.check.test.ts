import { expect, test } from "bun:test"
import { definitionIsWrittenInTheGrammar } from "akasha/check/code/pages/definition-is-written-in-the-grammar/definition-is-written-in-the-grammar.check-code.check.code.ts"

test("nothing is refused at change, because every definition is judged whole at audit", () => {
  expect(definitionIsWrittenInTheGrammar()).toEqual([])
})
