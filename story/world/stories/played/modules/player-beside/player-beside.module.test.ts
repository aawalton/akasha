import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { theTowerAlan } from "akasha/story/world/pages/personas/stories/played/the-tower/characters/the-tower-alan.character-player.ts"
import {
  characterIn,
  playerIn,
} from "akasha/story/world/stories/played/modules/player-beside/player-beside.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

test("the player is the character player naming the story the external id found", () => {
  const stories = [{ values: { slug: "found" } }]
  const players = [
    { values: { slug: "other-alan", story: namedAs(storyPlayed.slug, "other", null) } },
    { values: { slug: theTowerAlan.slug, story: namedAs(storyPlayed.slug, "found", null) } },
  ]
  expect(playerIn(stories, players)).toBe(`character-player/${theTowerAlan.slug}`)
})

test("no story found for the external id is answered no player", () => {
  const players = [{ values: { slug: "alan", story: namedAs(storyPlayed.slug, "found", null) } }]
  expect(playerIn([], players)).toBeNull()
})

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
