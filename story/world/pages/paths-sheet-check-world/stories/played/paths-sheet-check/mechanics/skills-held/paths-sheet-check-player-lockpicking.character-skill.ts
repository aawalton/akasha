import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pathsSheetCheckPlayerLockpicking = {
  id: "01a182db-5bf2-7214-93d5-691644523592",
  type: "page-type/character-skill",
  slug: "paths-sheet-check-player-lockpicking",
  world: "world/paths-sheet-check-world",
  character: "character-player/paths-sheet-check-player",
  skill: "world-skill/paths-sheet-check-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/paths-sheet-check-player-agility",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies CharacterSkill
