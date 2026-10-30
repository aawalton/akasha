import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedTrial2NalaPathOfEavesdropping = {
  id: "01a18dab-06cd-7285-9ed0-3d19774d843d",
  type: "page-type/character-skill",
  slug: "gifted-trial2-nala-path-of-eavesdropping",
  world: "world/gifted-trial2-world",
  character: "character-player/gifted-trial2-nala",
  skill: "world-skill/gifted-trial2-world-path-of-eavesdropping",
  experience: 5,
  unrevealed: false,
  attribute: "metric-character-stat/gifted-trial2-nala-mental",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T17:02:46.385Z",
} as const satisfies CharacterSkill
