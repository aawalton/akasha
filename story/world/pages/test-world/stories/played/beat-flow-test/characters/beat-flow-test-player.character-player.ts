import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const beatFlowTestPlayer = {
  id: "01a17f7f-6e81-7f5f-b3b2-e4b99ed93116",
  type: "page-type/character-player",
  slug: "beat-flow-test-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/beat-flow-test",
  place: "place/test-world-square",
  person: "person/alan",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies CharacterPlayer
