import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const timeProbePlayerLockpicking = {
  id: "01a1802d-b13e-7c34-ba69-06e8105dfaa4",
  type: "page-type/character-skill",
  slug: "time-probe-player-lockpicking",
  world: "world/time-probe-world",
  character: "character-player/time-probe-player",
  skill: "world-skill/time-probe-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/time-probe-player-agility",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies CharacterSkill
