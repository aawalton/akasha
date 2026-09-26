import { expect, test } from "bun:test"
import { theTowerAlan } from "akasha/story/world/pages/personas/stories/played/the-tower/characters/the-tower-alan.character-player.ts"
import { characterIn } from "akasha/story/world/stories/played/modules/game-player-beside/game-player-beside.module.code.ts"

test("the character player a story has is answered by its address", () => {
  expect(characterIn([{ values: { slug: theTowerAlan.slug } }])).toBe(
    `character-player/${theTowerAlan.slug}`
  )
})

test("a story with no character player is answered nothing", () => {
  expect(characterIn([])).toBeNull()
})

test("a row whose slug is empty or no text is passed over", () => {
  expect(characterIn([{ values: { slug: "" } }, { values: { slug: 7 } }])).toBeNull()
})
