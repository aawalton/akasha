import { expect, test } from "bun:test"
import {
  fitSaid,
  storyTurnKeptList,
} from "akasha/command/pages/story/turn/kept/list/story-turn-kept-list.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha story turn kept list",
  from: "test",
  writer: null,
  agentId: null,
}

test("a list naming no turn is refused before any page is looked for", () => {
  const said = storyTurnKeptList([], OUTSIDE)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("--turn")
})

test("a list says of each edit whether it fits, and why one fitting nothing does not", () => {
  expect(fitSaid("fits")).toContain("fits the pages")
  expect(fitSaid("rederived")).toContain("derived again")
  expect(fitSaid("landed")).toContain("holds its new lines already")
  expect(fitSaid({ unfit: "no such passage" })).toBe("fits nothing: no such passage")
})
