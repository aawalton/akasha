import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { measurePage } from "akasha/commands/pages/measure/page/measure-page.command.code.ts"

const NOWHERE = "/nowhere"

const GIVEN: Given = {
  root: NOWHERE,
  calledAs: "akasha measure page",
  from: NOWHERE,
  writer: null,
  agentId: null,
}

test("a flag is refused, and the refusal says this takes no argument at all", () => {
  const said = measurePage(["--json"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--json` is no argument")
  expect(said.refusals[0]).toContain("it takes none")
})

test("a word naming a page type is refused, since this answers every page type", () => {
  const said = measurePage(["persona"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("it takes none")
})

test("a refused call counts nothing, so no checkout is ever walked", () => {
  expect(measurePage(["--json"], GIVEN).report).toEqual([])
})
