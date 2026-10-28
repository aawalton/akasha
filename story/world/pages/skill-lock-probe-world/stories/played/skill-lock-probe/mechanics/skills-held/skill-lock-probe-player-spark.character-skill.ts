import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const skillLockProbePlayerSpark = {
  id: "01a17ff8-9a7f-7019-be1b-974a37f2314a",
  type: "page-type/character-skill",
  slug: "skill-lock-probe-player-spark",
  world: "world/skill-lock-probe-world",
  character: "character-player/skill-lock-probe-player",
  skill: "world-skill/skill-lock-probe-world-spark",
  experience: 12,
  attribute: "metric-character-stat/skill-lock-probe-player-wits",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies CharacterSkill
