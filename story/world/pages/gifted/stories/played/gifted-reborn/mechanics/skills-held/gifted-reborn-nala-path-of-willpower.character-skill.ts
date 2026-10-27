import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedRebornNalaPathOfWillpower = {
  id: "01a17ee1-97ba-7c06-bccb-c6325b099b44",
  type: "page-type/character-skill",
  slug: "gifted-reborn-nala-path-of-willpower",
  world: "world/gifted",
  character: "character-player/gifted-reborn-nala",
  skill: "world-skill/gifted-path-of-willpower",
  experience: 4,
  attribute: "metric-character-stat/gifted-reborn-nala-mental",
  createdAt: "2026-10-27T19:41:16.088Z",
  updatedAt: "2026-10-27T19:41:16.088Z",
} as const satisfies CharacterSkill
