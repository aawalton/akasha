import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pathsSheetCheckPlayerSwordplay = {
  id: "01a182db-5bf2-7ec3-ad12-6e0c5f7e8dc8",
  type: "page-type/character-skill",
  slug: "paths-sheet-check-player-swordplay",
  world: "world/paths-sheet-check-world",
  character: "character-player/paths-sheet-check-player",
  skill: "world-skill/paths-sheet-check-world-swordplay",
  experience: 44,
  attribute: "metric-character-stat/paths-sheet-check-player-strength",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies CharacterSkill
