import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f4c-d936-7c26-8afc-78cad366ede4",
  type: "page-type/character-player",
  slug: "clone-probe-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/clone-probe",
  place: "place/test-world-hall",
  person: "person/alan",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:57:31.063Z",
} as const satisfies CharacterPlayer
