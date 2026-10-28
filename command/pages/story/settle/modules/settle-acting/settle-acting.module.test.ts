import { expect, test } from "bun:test"
import { actedOn } from "akasha/command/pages/story/settle/modules/settle-acting/settle-acting.module.code.ts"

const KICK = "I kick twice"

test("a reading naming a player character carries the turn's action", () => {
  expect(actedOn({ character: "character-player/nala" }, KICK)).toEqual({ action: KICK })
})

test("a reading naming another character carries no action", () => {
  expect(actedOn({ character: "character-other/her" }, KICK)).toEqual({})
})

test("a reading naming no character carries no action", () => {
  expect(actedOn({ minutes: 5 }, KICK)).toEqual({})
})

test("a turn stating no action hands none on", () => {
  expect(actedOn({ character: "character-player/nala" }, null)).toEqual({})
})
