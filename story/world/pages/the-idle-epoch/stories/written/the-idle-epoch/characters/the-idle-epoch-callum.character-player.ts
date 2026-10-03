import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const theIdleEpochCallum = {
  id: "01a10331-674d-7f3d-bcd4-b74d0b9527e3",
  type: "page-type/character-player",
  slug: "the-idle-epoch-callum",
  title: "Callum Voss",
  story: "story-written/the-idle-epoch",
  place: "place/the-idle-epoch-warehouse",
  person: "person/alan",
} as const satisfies CharacterPlayer
