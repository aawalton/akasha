import { expect, test } from "bun:test"
import { changeList } from "akasha/commands/pages/change/list/change-list.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change list",
  from: "test",
  writer: null,
  agentId: null,
}

test("a list naming a word is refused before any page is looked for", () => {
  const said = changeList(["one"], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("takes no word")
})

test("a flag on the command line is refused", () => {
  expect(changeList(["--all"], OUTSIDE).refusals[0]).toContain("takes no flag")
})

test("the help flag is answered rather than refused as a flag", () => {
  const said = changeList(["--help"], OUTSIDE)
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe(OUTSIDE.calledAs)
})

test("a list by an agent with no page is refused rather than answered with nothing", () => {
  const said = changeList([], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page the edits would be kept beside")
})
