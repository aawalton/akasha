import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedTrial2NalaPathOfEndurance = {
  id: "01a18dab-06cd-7374-bad8-b72cfa3a57b6",
  type: "page-type/character-skill",
  slug: "gifted-trial2-nala-path-of-endurance",
  world: "world/gifted-trial2-world",
  character: "character-player/gifted-trial2-nala",
  skill: "world-skill/gifted-trial2-world-path-of-endurance",
  experience: 0,
  unrevealed: true,
  attribute: "metric-character-stat/gifted-trial2-nala-stamina",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies CharacterSkill
