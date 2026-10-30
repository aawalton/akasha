import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedTrialNalaPathOfEavesdropping = {
  id: "01a18d10-93f1-7cd8-8bd6-4bf98c3a8d78",
  type: "page-type/character-skill",
  slug: "gifted-trial-nala-path-of-eavesdropping",
  world: "world/gifted-trial-world",
  character: "character-player/gifted-trial-nala",
  skill: "world-skill/gifted-trial-world-path-of-eavesdropping",
  experience: 0,
  unrevealed: true,
  attribute: "metric-character-stat/gifted-trial-nala-mental",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies CharacterSkill
