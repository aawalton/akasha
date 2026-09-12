import { expect, test } from "bun:test"
import { changeDrop } from "akasha/commands/pages/change/drop/change-drop.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change drop",
  from: "test",
  writer: null,
  agentId: null,
}

test("a drop naming a word is refused before any page is looked for", () => {
  const said = changeDrop(["one"], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("takes no word")
})

test("a flag on the command line is refused", () => {
  expect(changeDrop(["--all"], OUTSIDE).refusals[0]).toContain("takes no flag")
})

test("a drop by an agent with no page is refused rather than taking anything away", () => {
  const said = changeDrop([], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page the edits would be kept beside")
})
