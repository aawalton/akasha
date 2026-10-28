import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const undoCheckPlayerSwordplay = {
  id: "01a18309-e114-7863-bbf2-528fbd9b0f63",
  type: "page-type/character-skill",
  slug: "undo-check-player-swordplay",
  world: "world/undo-check-world",
  character: "character-player/undo-check-player",
  skill: "world-skill/undo-check-world-swordplay",
  experience: 44,
  attribute: "metric-character-stat/undo-check-player-strength",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies CharacterSkill
