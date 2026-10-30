import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const giftedTrialNala = {
  id: "01a18d10-93f1-7fd6-b568-ecc4b5ec19f4",
  type: "page-type/character-player",
  slug: "gifted-trial-nala",
  title: "Nala",
  world: "world/gifted-trial-world",
  story: "story-played/gifted-trial",
  place: "place/gifted-trial-world-womb",
  person: "person/alan",
  color: "color/purple",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies CharacterPlayer
