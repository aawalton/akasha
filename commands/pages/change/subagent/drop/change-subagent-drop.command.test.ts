import { expect, test } from "bun:test"
import { changeSubagentDrop } from "akasha/commands/pages/change/subagent/drop/change-subagent-drop.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change subagent drop",
  from: "test",
  writer: null,
  agentId: null,
}

test("a word on the command line is refused and the piping is named", () => {
  const said = changeSubagentDrop(["one"], OUTSIDE)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`one` is no argument")
  expect(said.refusals[said.refusals.length - 1]).toContain("piped in")
})

test("a drop by an agent with no page is refused rather than answered with nothing", () => {
  const said = changeSubagentDrop([], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page")
})
