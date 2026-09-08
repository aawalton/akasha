import { expect, test } from "bun:test"
import { changeList } from "./change-list.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change list",
  from: "test",
  writer: null,
  agentId: null,
}

test("a list naming two words is refused before any page is looked for", () => {
  const said = changeList(["one", "two"], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("one subagent or none")
})

test("a flag where the subagent would be is refused", () => {
  expect(changeList(["--all"], OUTSIDE).refusals[0]).toContain("takes no flag")
})

test("a list by an agent with no page is refused rather than answered with nothing", () => {
  const said = changeList([], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page the edits would be kept beside")
})
