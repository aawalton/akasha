import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedPolishNalaPathOfEndurance = {
  id: "01a18e17-127d-7db1-a6df-2eaaea875197",
  type: "page-type/character-skill",
  slug: "gifted-polish-nala-path-of-endurance",
  world: "world/gifted-polish-world",
  character: "character-player/gifted-polish-nala",
  skill: "world-skill/gifted-polish-world-path-of-endurance",
  experience: 0,
  unrevealed: true,
  attribute: "metric-character-stat/gifted-polish-nala-stamina",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies CharacterSkill
