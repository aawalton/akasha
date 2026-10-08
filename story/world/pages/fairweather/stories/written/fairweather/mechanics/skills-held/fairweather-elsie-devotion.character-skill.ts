import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherElsieDevotion = {
  id: "01a107b3-963f-76e7-8e65-f3ca4cd71950",
  type: "page-type/character-skill",
  slug: "fairweather-elsie-devotion",
  title: "Devotion",
  world: "world/fairweather",
  unrevealed: false,
  character: "character-player/fairweather-elsie",
  skill: "world-skill/fairweather-devotion",
  createdAt: "2026-10-04T16:16:12.000Z",
  updatedAt: "2026-10-04T16:16:12.000Z",
} as const satisfies CharacterSkill
