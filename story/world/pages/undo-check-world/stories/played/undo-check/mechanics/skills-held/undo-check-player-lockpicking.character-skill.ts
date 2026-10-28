import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const undoCheckPlayerLockpicking = {
  id: "01a18309-e114-702d-9200-ab711f8a164b",
  type: "page-type/character-skill",
  slug: "undo-check-player-lockpicking",
  world: "world/undo-check-world",
  character: "character-player/undo-check-player",
  skill: "world-skill/undo-check-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/undo-check-player-agility",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies CharacterSkill
