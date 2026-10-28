import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const skillLockProbePlayerSpark = {
  id: "01a17ff2-6f78-7376-b31f-67a8a466f404",
  type: "page-type/character-skill",
  slug: "skill-lock-probe-player-spark",
  world: "world/skill-lock-probe-world",
  character: "character-player/skill-lock-probe-player",
  skill: "world-skill/skill-lock-probe-world-spark",
  experience: 12,
  attribute: "metric-character-stat/skill-lock-probe-player-wits",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies CharacterSkill
