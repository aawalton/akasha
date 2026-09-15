import { expect, test } from "bun:test"
import { changeSubagentShow } from "akasha/command/pages/change/subagent/show/change-subagent-show.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change subagent show",
  from: "test",
  writer: null,
  agentId: null,
}

test("a word on the command line is refused and the piping is named", () => {
  const said = changeSubagentShow(["one"], OUTSIDE)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`one` is no argument")
  expect(said.refusals[said.refusals.length - 1]).toContain("piped in")
})

test("a flag on the command line is refused", () => {
  const said = changeSubagentShow(["--at"], OUTSIDE)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--at` is no argument")
})
