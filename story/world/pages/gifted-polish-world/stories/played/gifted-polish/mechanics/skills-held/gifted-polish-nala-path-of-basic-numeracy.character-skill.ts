import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedPolishNalaPathOfBasicNumeracy = {
  id: "01a18e17-127d-78dd-a6ad-7f49d2540a2a",
  type: "page-type/character-skill",
  slug: "gifted-polish-nala-path-of-basic-numeracy",
  world: "world/gifted-polish-world",
  character: "character-player/gifted-polish-nala",
  skill: "world-skill/gifted-polish-world-path-of-basic-numeracy",
  experience: 108,
  unrevealed: false,
  attribute: "metric-character-stat/gifted-polish-nala-mental",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies CharacterSkill
