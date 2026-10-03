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
} as const satisfies CharacterPlayer
