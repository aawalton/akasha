import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refreshMessage } from "akasha/commands/pages/refresh/message/refresh-message.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha refresh message",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a word said to a run that counts the days is refused", async () => {
  const said = await refreshMessage(["--nonsense"], GIVEN)

  expect(said.refusals).toEqual([
    "`--nonsense` is no argument `akasha refresh message` takes, and it takes none",
  ])
})

test("a word this takes no argument at is the caller's mistake, and nothing is counted", async () => {
  const said = await refreshMessage(["--nonsense"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})
