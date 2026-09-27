import { expect, test } from "bun:test"
import {
  added,
  settled,
} from "akasha/story/world/pages/personas/stories/played/the-dating-game/mechanics/checks/the-dating-game-closeness-scoring.world-check.settling.code.ts"

const AT = {
  character: "her",
  validation: 2,
  acknowledgment: 1,
  reassurance: 0,
  emotionalIntimacy: 2,
  turnedAway: 0,
  quotes: {
    validation: "you did great",
    acknowledgment: "that sounds hard",
    emotionalIntimacy: ["I feel it too", "me too"],
    turnedAway: "he walks on",
  },
}

test("the four scores add up to the points earned", () => {
  expect(settled(AT)).toEqual({ answered: { earned: 5, lost: 0, change: 5 } })
})

test("each missed bid costs two points", () => {
  expect(settled({ ...AT, turnedAway: 2 })).toEqual({
    answered: { earned: 5, lost: 4, change: 1 },
  })
})

test("missed bids can take more than the turn earned", () => {
  expect(settled({ ...AT, validation: 0, emotionalIntimacy: 0, turnedAway: 1 })).toEqual({
    answered: { earned: 1, lost: 2, change: -1 },
  })
})

test("a skill scored above two is refused", () => {
  expect(settled({ ...AT, reassurance: 3 })).toHaveProperty("refused")
})

test("a reading naming no character is refused", () => {
  expect(settled({ ...AT, character: "" })).toHaveProperty("refused")
})

test("a skill scored above nought with no quote is refused", () => {
  expect(settled({ ...AT, quotes: { ...AT.quotes, validation: "" } })).toHaveProperty("refused")
})

test("a missed bid with no quote is refused", () => {
  expect(
    settled({
      ...AT,
      turnedAway: 1,
      quotes: { validation: "a", acknowledgment: "b", emotionalIntimacy: "c" },
    })
  ).toHaveProperty("refused")
})

test("a skill scored nought needs no quote", () => {
  expect(settled({ ...AT, quotes: { ...AT.quotes, reassurance: undefined } })).toHaveProperty(
    "answered"
  )
})

test("a skill scored in part is refused", () => {
  expect(settled({ ...AT, validation: 1.5 })).toHaveProperty("refused")
})

test("a skill scored as no number is refused", () => {
  expect(settled({ ...AT, acknowledgment: Number.NaN })).toHaveProperty("refused")
})

test("a skill left unscored is refused", () => {
  expect(settled({ ...AT, reassurance: undefined })).toHaveProperty("refused")
})

test("a count of missed bids below nought is refused", () => {
  expect(settled({ ...AT, turnedAway: -1 })).toHaveProperty("refused")
})

test("a reading that is no keyed reading is refused", () => {
  expect(settled([2, 1, 0, 3, 0])).toHaveProperty("refused")
})

test("the change is added to the points on her relationship page", () => {
  expect(
    added({ ...AT, character: "character-other/the-dating-game-her" }, { change: -1 })
  ).toEqual([{ page: "world-relationship/the-dating-game-her", key: "relationshipPoints", by: -1 }])
})

test("an answer with no change adds nothing", () => {
  expect(added(AT, { earned: 1 })).toEqual([])
})
