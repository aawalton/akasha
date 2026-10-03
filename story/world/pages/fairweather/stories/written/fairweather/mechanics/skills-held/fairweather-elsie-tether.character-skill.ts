import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherElsieTether = {
  id: "01a10364-98f2-7d20-976b-d18a15a86647",
  type: "page-type/character-skill",
  slug: "fairweather-elsie-tether",
  title: "Tether",
  world: "world/fairweather",
  character: "character-player/fairweather-elsie",
  skill: "world-skill/fairweather-tether",
  unrevealed: false,
} as const satisfies CharacterSkill
