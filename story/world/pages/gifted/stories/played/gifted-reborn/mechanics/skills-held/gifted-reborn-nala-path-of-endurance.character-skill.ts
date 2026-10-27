import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedRebornNalaPathOfEndurance = {
  id: "01a17ee1-97ba-7735-a978-61c159a900b6",
  type: "page-type/character-skill",
  slug: "gifted-reborn-nala-path-of-endurance",
  world: "world/gifted",
  character: "character-player/gifted-reborn-nala",
  skill: "world-skill/gifted-path-of-endurance",
  experience: 1267,
  attribute: "metric-character-stat/gifted-reborn-nala-stamina",
  createdAt: "2026-10-27T19:41:16.088Z",
  updatedAt: "2026-10-27T19:41:16.088Z",
} as const satisfies CharacterSkill
