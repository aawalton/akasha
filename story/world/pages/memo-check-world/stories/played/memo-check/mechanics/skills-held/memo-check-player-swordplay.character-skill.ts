import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const memoCheckPlayerSwordplay = {
  id: "01a1832d-38c0-7f9a-b0eb-7f7ae46b38d5",
  type: "page-type/character-skill",
  slug: "memo-check-player-swordplay",
  world: "world/memo-check-world",
  character: "character-player/memo-check-player",
  skill: "world-skill/memo-check-world-swordplay",
  experience: 44,
  attribute: "metric-character-stat/memo-check-player-strength",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies CharacterSkill
