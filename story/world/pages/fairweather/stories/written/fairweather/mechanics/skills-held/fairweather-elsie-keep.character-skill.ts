import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherElsieKeep = {
  id: "01a112d2-0bf7-7754-ac7b-be82ad66bc8e",
  type: "page-type/character-skill",
  slug: "fairweather-elsie-keep",
  title: "Keep",
  world: "world/fairweather",
  unrevealed: false,
  character: "character-player/fairweather-elsie",
  skill: "world-skill/fairweather-keep",
  createdAt: "2026-10-06T20:05:17.943Z",
  updatedAt: "2026-10-06T20:05:18.000Z",
} as const satisfies CharacterSkill
