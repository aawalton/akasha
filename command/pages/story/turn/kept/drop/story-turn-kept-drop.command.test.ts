import { expect, test } from "bun:test"
import { storyTurnKeptDrop } from "akasha/command/pages/story/turn/kept/drop/story-turn-kept-drop.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha story turn kept drop",
  from: "test",
  writer: null,
  agentId: null,
}

test("a drop naming no record is refused before any page is looked for", () => {
  const said = storyTurnKeptDrop(["--turn", "s-00-001"], OUTSIDE)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("--record")
})

test("a drop naming a record that is no whole number is refused", () => {
  const said = storyTurnKeptDrop(["--turn", "s-00-001", "--record", "two"], OUTSIDE)
  expect(said.code).toBe(1)
})
