import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedRebornNalaPathOfBasicNumeracy = {
  id: "01a17ee1-97b9-787c-bde7-910cdcbaa60c",
  type: "page-type/character-skill",
  slug: "gifted-reborn-nala-path-of-basic-numeracy",
  world: "world/gifted",
  character: "character-player/gifted-reborn-nala",
  skill: "world-skill/gifted-path-of-basic-numeracy",
  experience: 24,
  unrevealed: false,
  attribute: "metric-character-stat/gifted-reborn-nala-mental",
  createdAt: "2026-10-27T19:41:16.088Z",
  updatedAt: "2026-10-28T15:06:42.997Z",
} as const satisfies CharacterSkill
