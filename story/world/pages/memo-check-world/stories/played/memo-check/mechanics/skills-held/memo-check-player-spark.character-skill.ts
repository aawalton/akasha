import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const memoCheckPlayerSpark = {
  id: "01a1832d-38c0-7f2d-82ef-4e2ba950881d",
  type: "page-type/character-skill",
  slug: "memo-check-player-spark",
  world: "world/memo-check-world",
  character: "character-player/memo-check-player",
  skill: "world-skill/memo-check-world-spark",
  experience: 12,
  attribute: "metric-character-stat/memo-check-player-wits",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies CharacterSkill
