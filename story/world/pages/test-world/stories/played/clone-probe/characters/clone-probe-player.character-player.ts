import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f3e-4455-7b7d-b4d7-099bf5ab4fe8",
  type: "page-type/character-player",
  slug: "clone-probe-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/clone-probe",
  place: "place/test-world-square",
  person: "person/alan",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies CharacterPlayer
