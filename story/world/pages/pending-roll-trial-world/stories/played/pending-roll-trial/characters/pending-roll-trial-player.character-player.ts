import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const pendingRollTrialPlayer = {
  id: "01a183cf-b828-774c-8130-973444f6229d",
  type: "page-type/character-player",
  slug: "pending-roll-trial-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/pending-roll-trial",
  place: "place/pending-roll-trial-world-square",
  person: "person/alan",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies CharacterPlayer
