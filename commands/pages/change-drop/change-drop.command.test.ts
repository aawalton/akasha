import { expect, test } from "bun:test"
import { changeDrop } from "./change-drop.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change drop",
  from: "test",
  writer: null,
  agentId: null,
}

test("a drop naming two words is refused before any page is looked for", () => {
  const said = changeDrop(["one", "two"], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("one subagent or none")
})

test("a flag where the subagent would be is refused", () => {
  expect(changeDrop(["--all"], OUTSIDE).refusals[0]).toContain("takes no flag")
})

test("a drop by an agent with no page is refused rather than taking anything away", () => {
  const said = changeDrop([], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page the edits would be kept beside")
})
