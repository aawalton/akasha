import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pathsProbePlayerLockpicking = {
  id: "01a18008-7534-782d-914b-350fd37b671b",
  type: "page-type/character-skill",
  slug: "paths-probe-player-lockpicking",
  world: "world/paths-probe-world",
  character: "character-player/paths-probe-player",
  skill: "world-skill/paths-probe-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/paths-probe-player-agility",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies CharacterSkill
