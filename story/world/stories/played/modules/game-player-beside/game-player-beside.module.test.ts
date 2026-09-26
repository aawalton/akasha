import { expect, test } from "bun:test"
import { haremHotel } from "akasha/story/game/pages/harem-hotel/harem-hotel.story-game.ts"
import { theTowerAlan } from "akasha/story/world/pages/personas/stories/played/the-tower/characters/the-tower-alan.character-player.ts"
import {
  characterIn,
  type Played,
  playerIn,
} from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"

function rowOf(player: unknown): Played {
  const values: Record<string, unknown> = { externalId: haremHotel.externalId }
  if (player !== undefined) values["player"] = player
  return { values }
}

test("the player a game names is the player answered", () => {
  expect(playerIn([rowOf(haremHotel.player)])).toBe(haremHotel.player)
})

test("the character player a story has is answered by its address", () => {
  expect(characterIn([{ values: { slug: theTowerAlan.slug } }])).toBe(
    `character-player/${theTowerAlan.slug}`
  )
})

test("a story with no character player is answered nothing", () => {
  expect(characterIn([])).toBeNull()
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
