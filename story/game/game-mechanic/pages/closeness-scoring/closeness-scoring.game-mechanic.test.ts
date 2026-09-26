import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/game-mechanic/pages/closeness-scoring/closeness-scoring.game-mechanic.code.ts"

const AT = {
  validation: 2,
  acknowledgment: 1,
  reassurance: 0,
  emotionalIntimacy: 3,
  turnedAway: 0,
}

test("the four scores add up to the points earned", () => {
  expect(runMechanic(AT)).toEqual({ answered: { earned: 6, lost: 0, change: 6 } })
})

test("each missed bid costs two points", () => {
  expect(runMechanic({ ...AT, turnedAway: 2 })).toEqual({
    answered: { earned: 6, lost: 4, change: 2 },
  })
})

test("missed bids can take more than the interaction earned", () => {
  expect(runMechanic({ ...AT, validation: 0, emotionalIntimacy: 0, turnedAway: 1 })).toEqual({
    answered: { earned: 1, lost: 2, change: -1 },
  })
})

test("a skill scored above three is refused", () => {
  expect(runMechanic({ ...AT, reassurance: 4 })).toHaveProperty("refused")
})

test("a skill scored in part is refused", () => {
  expect(runMechanic({ ...AT, validation: 1.5 })).toHaveProperty("refused")
})

test("a skill scored as no number is refused", () => {
  expect(runMechanic({ ...AT, acknowledgment: Number.NaN })).toHaveProperty("refused")
})

test("a count of missed bids below nought is refused", () => {
  expect(runMechanic({ ...AT, turnedAway: -1 })).toHaveProperty("refused")
})
