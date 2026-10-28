import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const skillLockProbePlayerSwordplay = {
  id: "01a17ff8-9a7f-7e69-901b-a6cac09b4c47",
  type: "page-type/character-skill",
  slug: "skill-lock-probe-player-swordplay",
  world: "world/skill-lock-probe-world",
  character: "character-player/skill-lock-probe-player",
  skill: "world-skill/skill-lock-probe-world-swordplay",
  experience: 44,
  attribute: "metric-character-stat/skill-lock-probe-player-strength",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies CharacterSkill
