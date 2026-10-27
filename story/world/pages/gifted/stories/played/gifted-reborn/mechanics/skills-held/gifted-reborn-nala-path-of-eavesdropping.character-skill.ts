import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedRebornNalaPathOfEavesdropping = {
  id: "01a17ee1-97b9-7af8-8c1a-62b6df428282",
  type: "page-type/character-skill",
  slug: "gifted-reborn-nala-path-of-eavesdropping",
  world: "world/gifted",
  character: "character-player/gifted-reborn-nala",
  skill: "world-skill/gifted-path-of-eavesdropping",
  experience: 62,
  attribute: "metric-character-stat/gifted-reborn-nala-mental",
  createdAt: "2026-10-27T19:41:16.088Z",
  updatedAt: "2026-10-27T19:41:16.088Z",
} as const satisfies CharacterSkill
