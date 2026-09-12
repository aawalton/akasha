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

test("the help flag is answered rather than refused as a flag", () => {
  const said = changeDrop(["--help"], OUTSIDE)
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe(OUTSIDE.calledAs)
})

test("a drop by an agent with no page is refused rather than taking anything away", () => {
  const said = changeDrop([], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page the edits would be kept beside")
})
