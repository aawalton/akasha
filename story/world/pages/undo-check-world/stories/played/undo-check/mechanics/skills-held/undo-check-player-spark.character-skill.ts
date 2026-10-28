import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const undoCheckPlayerSpark = {
  id: "01a18309-e114-78b9-9743-4473ae09d2ae",
  type: "page-type/character-skill",
  slug: "undo-check-player-spark",
  world: "world/undo-check-world",
  character: "character-player/undo-check-player",
  skill: "world-skill/undo-check-world-spark",
  experience: 12,
  attribute: "metric-character-stat/undo-check-player-wits",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies CharacterSkill
