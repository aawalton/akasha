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
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`one` is no argument")
  expect(said.refusals[0]).toContain("it takes none")
})

test("a flag on the command line is refused, and the refusal says where the paths go", () => {
  const said = changeDrop(["--all"], OUTSIDE)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--all` is no argument")
  expect(said.refusals.at(-1)).toContain("piped in")
})

test("every word a call names is refused rather than the first alone", () => {
  const said = changeDrop(["one", "two"], OUTSIDE)
  expect(said.refusals[0]).toContain("`one`")
  expect(said.refusals[1]).toContain("`two`")
})

test("a drop by an agent with no page is refused rather than taking anything away", () => {
  const said = changeDrop([], OUTSIDE)
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("no agent whose page")
})
