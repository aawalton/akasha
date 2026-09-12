import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refreshPersona } from "akasha/commands/pages/refresh/persona/refresh-persona.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha refresh persona",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a word said to a run that rebuilds the points is refused", async () => {
  const said = await refreshPersona(["--nonsense"], GIVEN)

  expect(said.refusals).toEqual([
    "`--nonsense` is no argument `akasha refresh persona` takes, and it takes none",
  ])
})

test("a word this takes no argument at is the caller's mistake, and nothing is rebuilt", async () => {
  const said = await refreshPersona(["--nonsense"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})
