import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff2-6f78-798e-8c52-559783eb158d",
  type: "page-type/character-player",
  slug: "skill-lock-probe-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/skill-lock-probe",
  place: "place/skill-lock-probe-world-square",
  person: "person/alan",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies CharacterPlayer
