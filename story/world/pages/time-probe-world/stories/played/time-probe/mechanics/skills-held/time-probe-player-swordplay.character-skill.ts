import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const timeProbePlayerSwordplay = {
  id: "01a1802d-b13e-74ca-80a0-043120c782d1",
  type: "page-type/character-skill",
  slug: "time-probe-player-swordplay",
  world: "world/time-probe-world",
  character: "character-player/time-probe-player",
  skill: "world-skill/time-probe-world-swordplay",
  experience: 44,
  attribute: "metric-character-stat/time-probe-player-strength",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies CharacterSkill
