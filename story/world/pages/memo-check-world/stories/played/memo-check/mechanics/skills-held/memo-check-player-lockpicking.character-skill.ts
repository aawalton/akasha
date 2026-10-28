import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const memoCheckPlayerLockpicking = {
  id: "01a1832d-38c0-7e1f-bc68-18a1bcf92d7e",
  type: "page-type/character-skill",
  slug: "memo-check-player-lockpicking",
  world: "world/memo-check-world",
  character: "character-player/memo-check-player",
  skill: "world-skill/memo-check-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/memo-check-player-agility",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies CharacterSkill
