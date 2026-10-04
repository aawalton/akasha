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
} as const satisfies CharacterSkill
