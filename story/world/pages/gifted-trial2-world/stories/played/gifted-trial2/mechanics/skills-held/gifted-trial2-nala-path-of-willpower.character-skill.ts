import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedTrial2NalaPathOfWillpower = {
  id: "01a18dab-06cd-7b48-8bf4-b17bf4d5225d",
  type: "page-type/character-skill",
  slug: "gifted-trial2-nala-path-of-willpower",
  world: "world/gifted-trial2-world",
  character: "character-player/gifted-trial2-nala",
  skill: "world-skill/gifted-trial2-world-path-of-willpower",
  experience: 0,
  unrevealed: true,
  attribute: "metric-character-stat/gifted-trial2-nala-mental",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies CharacterSkill
