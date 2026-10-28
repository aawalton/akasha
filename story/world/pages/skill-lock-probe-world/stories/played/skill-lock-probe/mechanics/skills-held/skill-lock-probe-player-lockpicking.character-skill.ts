import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const skillLockProbePlayerLockpicking = {
  id: "01a17ff8-9a7f-77bf-912c-ce3e260c0bed",
  type: "page-type/character-skill",
  slug: "skill-lock-probe-player-lockpicking",
  world: "world/skill-lock-probe-world",
  character: "character-player/skill-lock-probe-player",
  skill: "world-skill/skill-lock-probe-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/skill-lock-probe-player-agility",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies CharacterSkill
