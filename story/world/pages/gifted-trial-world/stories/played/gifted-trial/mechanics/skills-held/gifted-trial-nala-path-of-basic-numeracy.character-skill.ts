import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedTrialNalaPathOfBasicNumeracy = {
  id: "01a18d10-93f1-707f-a31e-1cb5251a9748",
  type: "page-type/character-skill",
  slug: "gifted-trial-nala-path-of-basic-numeracy",
  world: "world/gifted-trial-world",
  character: "character-player/gifted-trial-nala",
  skill: "world-skill/gifted-trial-world-path-of-basic-numeracy",
  experience: 108,
  unrevealed: false,
  attribute: "metric-character-stat/gifted-trial-nala-mental",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies CharacterSkill
