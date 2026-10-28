import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const timeProbePlayer = {
  id: "01a1802d-b13e-7125-831d-87d35d6ba30b",
  type: "page-type/character-player",
  slug: "time-probe-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/time-probe",
  place: "place/time-probe-world-square",
  person: "person/alan",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies CharacterPlayer
