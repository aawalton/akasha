import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const theBeholderPearl = {
  id: "01a0dec2-4dfc-7a83-a6cc-7f15690be980",
  type: "page-type/character-player",
  slug: "the-beholder-pearl",
  title: "Pearl",
  world: "world/the-beholder",
  story: "story-written/the-beholder",
  person: "person/alan",
  place: "place/the-beholder-rigging-loft",
  createdAt: "2026-09-26T17:27:51.036Z",
  updatedAt: "2026-10-03T19:16:47.000Z",
} as const satisfies CharacterPlayer
