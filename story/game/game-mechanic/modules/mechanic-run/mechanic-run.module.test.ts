import { expect, test } from "bun:test"
import {
  followingOn,
  lineOf,
  runIn,
} from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"

const RAN = {
  turn: 8,
  mechanic: "a-mechanic",
  reading: { attribute: 11, difficulty: 24 },
  answered: { hit: true, margin: 3 },
  bonuses: [{ from: "a skill", by: 2 }],
  dice: { said: "2d10", sides: 10, faces: [5, 7] },
  seed: "473365282",
  follows: null,
  said: "modest success",
}

test("a row written out reads back as the row it was", () => {
  expect(runIn(lineOf(RAN))).toEqual(RAN)
})

test("a row keeps whatever shape the mechanic it names takes", () => {
  const held = runIn(lineOf({ ...RAN, reading: { faces: [4, 5] }, answered: { total: 9 } }))
  expect(held?.reading).toEqual({ faces: [4, 5] })
  expect(held?.answered).toEqual({ total: 9 })
})

test("a line naming no mechanic reads as no row", () => {
  expect(runIn('{"turn":1}')).toBe(null)
  expect(runIn('{"mechanic":"a-mechanic"}')).toBe(null)
  expect(runIn('"a-mechanic"')).toBe(null)
})

test("a bonus that is no bonus is left out rather than half read", () => {
  const held = runIn('{"turn":1,"mechanic":"a","bonuses":[{"from":"b"},{"from":"c","by":3}]}')
  expect(held?.bonuses).toEqual([{ from: "c", by: 3 }])
})

test("dice that are no dice read as none rather than as half a roll", () => {
  const held = runIn('{"turn":1,"mechanic":"a","dice":{"said":"2d10","faces":[5,7]}}')
  expect(held?.dice).toBe(null)
  expect(runIn('{"turn":1,"mechanic":"a"}')?.dice).toBe(null)
})

test("a row follows the row before it by that row's hash", () => {
  const before = lineOf(RAN)
  expect(followingOn(before)).toBe(followingOn(before))
  expect(followingOn(before)).not.toBe(followingOn(lineOf({ ...RAN, turn: 9 })))
  expect(followingOn(null)).toBe(null)
})
