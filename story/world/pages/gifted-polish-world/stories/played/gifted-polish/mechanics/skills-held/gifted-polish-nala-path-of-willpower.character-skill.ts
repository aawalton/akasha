import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedPolishNalaPathOfWillpower = {
  id: "01a18e17-127d-7cc6-b6c0-ff2696048685",
  type: "page-type/character-skill",
  slug: "gifted-polish-nala-path-of-willpower",
  world: "world/gifted-polish-world",
  character: "character-player/gifted-polish-nala",
  skill: "world-skill/gifted-polish-world-path-of-willpower",
  experience: 0,
  unrevealed: true,
  attribute: "metric-character-stat/gifted-polish-nala-mental",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies CharacterSkill
