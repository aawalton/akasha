import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff8-9a7f-71ba-89e5-543e660f4c8e",
  type: "page-type/character-player",
  slug: "skill-lock-probe-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/skill-lock-probe",
  place: "place/skill-lock-probe-world-square",
  person: "person/alan",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies CharacterPlayer
