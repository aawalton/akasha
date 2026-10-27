import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const cloneProbePlayerLockpicking = {
  id: "01a17f4c-d936-7d44-956f-c90e451b3bb6",
  type: "page-type/character-skill",
  slug: "clone-probe-player-lockpicking",
  world: "world/test-world",
  character: "character-player/clone-probe-player",
  skill: "world-skill/test-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/clone-probe-player-agility",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies CharacterSkill
