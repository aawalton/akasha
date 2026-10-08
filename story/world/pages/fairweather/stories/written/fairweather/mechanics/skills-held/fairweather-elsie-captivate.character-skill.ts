import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherElsieCaptivate = {
  id: "01a10364-98f2-79e6-b20b-051ea6a8c90a",
  type: "page-type/character-skill",
  slug: "fairweather-elsie-captivate",
  title: "Captivate",
  world: "world/fairweather",
  character: "character-player/fairweather-elsie",
  skill: "world-skill/fairweather-captivate",
  unrevealed: false,
  createdAt: "2026-10-03T20:11:26.834Z",
  updatedAt: "2026-10-04T01:14:44.000Z",
} as const satisfies CharacterSkill
