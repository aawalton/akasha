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
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`one` is no argument")
  expect(said.refusals[0]).toContain("it takes none")
})

test("a flag on the command line is refused", () => {
  const said = changeList(["--all"], OUTSIDE)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--all` is no argument")
})

test("every word a call names is refused rather than the first alone", () => {
  const said = changeList(["one", "two"], OUTSIDE)
  expect(said.refusals[0]).toContain("`one`")
  expect(said.refusals[1]).toContain("`two`")
})

test("a list by an agent with no page is refused rather than answered with nothing", () => {
  const said = changeList([], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page the edits would be kept beside")
})
