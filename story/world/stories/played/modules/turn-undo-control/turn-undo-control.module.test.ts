import { expect, test } from "bun:test"
import {
  UNDO_WORDS,
  undoHeardIn,
  undoOffered,
  undoPatchOf,
} from "akasha/story/world/stories/played/modules/turn-undo-control/turn-undo-control.module.code.tsx"

test("an undo asks the story, named by its external id, to undo the one turn named", () => {
  expect(undoPatchOf("the-saga", "the-saga-00-012")).toEqual({
    pageTypeSlug: "story-played",
    where: [{ key: "externalId", eq: "the-saga" }],
    set: { turnUndo: "story-turn-played/the-saga-00-012" },
  })
})

test("an ask still on the story is not heard yet", () => {
  const row = { turnUndo: "story-turn-played/the-saga-00-012" }
  expect(undoHeardIn(row, "the-saga-00-012")).toEqual({ heard: false })
  expect(undoHeardIn(undefined, "the-saga-00-012")).toEqual({ heard: false })
})

test("an ask taken off is heard, undone where nothing refused it", () => {
  expect(undoHeardIn({}, "the-saga-00-012")).toEqual({ heard: true, refused: null })
  expect(undoHeardIn({ turnUndoRefused: "" }, "the-saga-00-012")).toEqual({
    heard: true,
    refused: null,
  })
})

test("an ask taken off with a refusal is heard with that refusal", () => {
  const row = { turnUndoRefused: "it is published already" }
  expect(undoHeardIn(row, "the-saga-00-012")).toEqual({
    heard: true,
    refused: "it is published already",
  })
})

test("a cancel and a take-back are each offered, asked and confirmed in their own words", () => {
  expect(UNDO_WORDS.cancel.offer).toBe("Cancel this turn")
  expect(UNDO_WORDS["take-back"].offer).toBe("Take back the last turn")
  expect(UNDO_WORDS.cancel.ask).toContain("your action comes back to the box")
})

test("a turn being made is offered to be cancelled, whatever waits", () => {
  expect(undoOffered("the-saga-00-013", "the-saga-00-012", true)).toEqual({
    turn: "the-saga-00-013",
    kind: "cancel",
  })
})

test("the latest turn at player is offered to be taken back only where nothing waits", () => {
  expect(undoOffered(null, "the-saga-00-012", false)).toEqual({
    turn: "the-saga-00-012",
    kind: "take-back",
  })
  expect(undoOffered(null, "the-saga-00-012", true)).toBeNull()
  expect(undoOffered(null, null, false)).toBeNull()
})
