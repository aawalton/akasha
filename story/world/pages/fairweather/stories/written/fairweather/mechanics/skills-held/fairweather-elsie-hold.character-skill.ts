import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherElsieHold = {
  id: "01a1062d-8782-72ab-a7c7-ac9cac9eec2e",
  type: "page-type/character-skill",
  slug: "fairweather-elsie-hold",
  title: "Hold",
  world: "world/fairweather",
  unrevealed: false,
  character: "character-player/fairweather-elsie",
  skill: "world-skill/fairweather-hold",
  createdAt: "2026-10-04T09:10:09.538Z",
  updatedAt: "2026-10-04T09:10:10.000Z",
} as const satisfies CharacterSkill
