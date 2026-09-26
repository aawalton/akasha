import type { CharacterPlayer } from "akasha/story/character/player/character-player.page-type.types.ts"

export const dragonsAndDungeonsAlan = {
  id: "01a0de42-c0fc-7eb2-9092-55eeffa073e6",
  type: "page-type/character-player",
  slug: "dragons-and-dungeons-alan",
  title: "Alan",
  story: "story-played/dragons-and-dungeons",
  person: "person/alan",
} as const satisfies CharacterPlayer
