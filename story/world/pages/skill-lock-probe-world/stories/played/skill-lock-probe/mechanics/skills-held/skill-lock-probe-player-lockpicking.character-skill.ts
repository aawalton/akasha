import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const skillLockProbePlayerLockpicking = {
  id: "01a17ff2-6f78-7f94-a48f-a1eda22a89e3",
  type: "page-type/character-skill",
  slug: "skill-lock-probe-player-lockpicking",
  world: "world/skill-lock-probe-world",
  character: "character-player/skill-lock-probe-player",
  skill: "world-skill/skill-lock-probe-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/skill-lock-probe-player-agility",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies CharacterSkill
