import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const skillLockProbePlayerSwordplay = {
  id: "01a17ff2-6f78-7a29-b45b-b932042ee1a2",
  type: "page-type/character-skill",
  slug: "skill-lock-probe-player-swordplay",
  world: "world/skill-lock-probe-world",
  character: "character-player/skill-lock-probe-player",
  skill: "world-skill/skill-lock-probe-world-swordplay",
  experience: 44,
  unrevealed: true,
  attribute: "metric-character-stat/skill-lock-probe-player-strength",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:40:58.870Z",
} as const satisfies CharacterSkill
