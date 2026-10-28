import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const timeProbePlayerSpark = {
  id: "01a1802d-b13e-7fb0-92ed-c0cd767d1631",
  type: "page-type/character-skill",
  slug: "time-probe-player-spark",
  world: "world/time-probe-world",
  character: "character-player/time-probe-player",
  skill: "world-skill/time-probe-world-spark",
  experience: 12,
  attribute: "metric-character-stat/time-probe-player-wits",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies CharacterSkill
