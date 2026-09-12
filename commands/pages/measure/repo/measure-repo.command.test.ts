import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { measureRepo } from "akasha/commands/pages/measure/repo/measure-repo.command.code.ts"

const NOWHERE = "/nowhere"

const GIVEN: Given = {
  root: NOWHERE,
  calledAs: "akasha measure repo",
  from: NOWHERE,
  writer: null,
  agentId: null,
}

test("a flag is refused, and the refusal says this takes no argument at all", () => {
  const said = measureRepo(["--json"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--json` is no argument")
  expect(said.refusals[0]).toContain("it takes none")
})

test("a word is refused the way a flag is", () => {
  const said = measureRepo(["ts"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("it takes none")
})

test("a refused call counts nothing, so no checkout is ever walked", () => {
  expect(measureRepo(["--json"], GIVEN).report).toEqual([])
})
