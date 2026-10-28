import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pathsSheetCheckPlayerSpark = {
  id: "01a182db-5bf2-7cb6-ba26-489be2ca9874",
  type: "page-type/character-skill",
  slug: "paths-sheet-check-player-spark",
  world: "world/paths-sheet-check-world",
  character: "character-player/paths-sheet-check-player",
  skill: "world-skill/paths-sheet-check-world-spark",
  experience: 12,
  attribute: "metric-character-stat/paths-sheet-check-player-wits",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies CharacterSkill
