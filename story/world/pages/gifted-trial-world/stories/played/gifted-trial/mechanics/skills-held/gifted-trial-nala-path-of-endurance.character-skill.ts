import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedTrialNalaPathOfEndurance = {
  id: "01a18d10-93f1-7803-9aa1-9d13d6ef86f8",
  type: "page-type/character-skill",
  slug: "gifted-trial-nala-path-of-endurance",
  world: "world/gifted-trial-world",
  character: "character-player/gifted-trial-nala",
  skill: "world-skill/gifted-trial-world-path-of-endurance",
  experience: 0,
  unrevealed: true,
  attribute: "metric-character-stat/gifted-trial-nala-stamina",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies CharacterSkill
