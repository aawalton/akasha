import { expect, test } from "bun:test"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import {
  type Latest,
  linesIn,
  slugAfter,
  stepIn,
  workingSaid,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  at,
  WORDS,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"
import { turnAfter } from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"

const LATEST: Latest = {
  slug: "the-saga-00-002",
  position: 2,
  collections: ["story-played/the-saga"],
  unit: WORDS,
  status: "player",
}

test("an action makes the next turn at the world builder, copying the story's turns", () => {
  expect(turnAfter(LATEST, "I open the gate")).toEqual({
    slug: "the-saga-00-003",
    values: {
      partOfCollections: ["story-played/the-saga"],
      position: 3,
      unit: WORDS,
      stepStatus: at("world-builder"),
      action: "I open the gate",
    },
  })
})

test("an action is kept exactly as it was typed", () => {
  const made = turnAfter(LATEST, "  I *shout*, twice  ")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.values["action"]).toBe("  I *shout*, twice  ")
})

test("an action is refused while the last turn is still being made", () => {
  const made = turnAfter({ ...LATEST, status: "reviewers" }, "I wait")
  expect(made).toEqual({
    refused: "The last turn is still being made: the reviewers are working on it.",
  })
  expect(turnAfter({ ...LATEST, status: "recorders" }, "I wait")).toEqual({
    refused: "The last turn is still being made: the recorders are working on it.",
  })
})

test("a slug's last number counts on, padded as it was", () => {
  expect(slugAfter("the-dating-game-00-002")).toBe("the-dating-game-00-003")
  expect(slugAfter("the-saga-00-009")).toBe("the-saga-00-010")
  expect(slugAfter("the-saga-00-999")).toBe("the-saga-00-1000")
  expect(slugAfter("the-saga")).toBeNull()
})

test("the words naming a step, and the lines of a handed-in file", () => {
  expect(stepIn(at("game-master"))).toBe("game-master")
  expect(stepIn(at("recorders"))).toBe("recorders")
  expect(stepIn(at("mechanics"))).toBe("mechanics")
  expect(stepIn(`${stepStatus.slug}/nobody`)).toBeNull()
  expect(workingSaid("world-builder")).toBe("The world builder is working…")
  expect(workingSaid("writer")).toBe("The writer is working…")
  expect(workingSaid("mechanics")).toBe("The mechanics recorder is working…")
  expect(workingSaid("reviewers")).toBe("The reviewers are working…")
  expect(workingSaid("recorders")).toBe("The recorders are working…")
  expect(linesIn(" one \n\n two\r\n")).toEqual(["one", "two"])
})
