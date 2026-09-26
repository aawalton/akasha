import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/personas/stories/played/the-dating-game/mechanics/checks/the-dating-game-closeness-scoring.world-check.settling.code.ts"

const AT = {
  validation: 2,
  acknowledgment: 1,
  reassurance: 0,
  emotionalIntimacy: 3,
  turnedAway: 0,
}

test("the four scores add up to the points earned", () => {
  expect(settled(AT)).toEqual({ answered: { earned: 6, lost: 0, change: 6 } })
})

test("each missed bid costs two points", () => {
  expect(settled({ ...AT, turnedAway: 2 })).toEqual({
    answered: { earned: 6, lost: 4, change: 2 },
  })
})

test("missed bids can take more than the interaction earned", () => {
  expect(settled({ ...AT, validation: 0, emotionalIntimacy: 0, turnedAway: 1 })).toEqual({
    answered: { earned: 1, lost: 2, change: -1 },
  })
})

test("a skill scored above three is refused", () => {
  expect(settled({ ...AT, reassurance: 4 })).toHaveProperty("refused")
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
