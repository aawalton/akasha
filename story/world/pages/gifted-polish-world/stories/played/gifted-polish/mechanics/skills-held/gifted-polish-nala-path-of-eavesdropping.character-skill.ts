import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedPolishNalaPathOfEavesdropping = {
  id: "01a18e17-127d-7b50-b0c6-afef7ea2c472",
  type: "page-type/character-skill",
  slug: "gifted-polish-nala-path-of-eavesdropping",
  world: "world/gifted-polish-world",
  character: "character-player/gifted-polish-nala",
  skill: "world-skill/gifted-polish-world-path-of-eavesdropping",
  experience: 1,
  unrevealed: false,
  attribute: "metric-character-stat/gifted-polish-nala-mental",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:45:58.490Z",
} as const satisfies CharacterSkill
