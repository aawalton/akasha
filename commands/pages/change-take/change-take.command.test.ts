import { expect, test } from "bun:test"
import { changeTake } from "./change-take.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change take",
  from: "test",
  writer: null,
  agentId: null,
}

test("a take naming two words is refused before any page is looked for", () => {
  const said = changeTake(["one", "two"], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("one subagent or none")
})

test("a flag where the subagent would be is refused", () => {
  expect(changeTake(["--all"], OUTSIDE).refusals[0]).toContain("takes no flag")
})

test("a take by an agent with no page is refused rather than moving anything", () => {
  const said = changeTake(["aine-a1"], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page the edits would be kept beside")
})
