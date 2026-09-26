import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const theVioletHourAlan = {
  id: "01a0ded9-a7dc-716e-aa59-bc75cfb196b7",
  type: "page-type/character-player",
  slug: "the-violet-hour-alan",
  title: "Alan",
  story: "story-played/the-violet-hour",
  person: "person/alan",
} as const satisfies CharacterPlayer
