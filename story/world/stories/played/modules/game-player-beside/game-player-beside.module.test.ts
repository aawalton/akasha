import { expect, test } from "bun:test"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.story-game.ts"
import {
  type Played,
  playerIn,
} from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"

function rowOf(player: unknown): Played {
  const values: Record<string, unknown> = { externalId: theTower.externalId }
  if (player !== undefined) values["player"] = player
  return { values }
}

test("the player a game names is the player answered", () => {
  expect(playerIn([rowOf(theTower.player)])).toBe(theTower.player)
})

test("a game naming no player is answered nothing", () => {
  expect(playerIn([rowOf(undefined)])).toBeNull()
})

test("a game whose player is empty is answered nothing", () => {
  expect(playerIn([rowOf("")])).toBeNull()
})

test("a game whose player is no text is answered nothing", () => {
  expect(playerIn([rowOf(7)])).toBeNull()
})

test("no row at all is answered nothing", () => {
  expect(playerIn([])).toBeNull()
})
