import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const probeTwoPlayer = {
  id: "01a17fbf-aff5-7d88-8f1b-0ca6a0150ce8",
  type: "page-type/character-player",
  slug: "probe-two-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/probe-two",
  place: "place/probe-two-world-square",
  person: "person/alan",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies CharacterPlayer
