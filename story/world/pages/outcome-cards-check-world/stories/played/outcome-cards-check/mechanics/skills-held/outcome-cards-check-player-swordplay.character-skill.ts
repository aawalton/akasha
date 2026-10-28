import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const outcomeCardsCheckPlayerSwordplay = {
  id: "01a17ffe-7d82-77b7-90f0-8f3fabc4db7f",
  type: "page-type/character-skill",
  slug: "outcome-cards-check-player-swordplay",
  world: "world/outcome-cards-check-world",
  character: "character-player/outcome-cards-check-player",
  skill: "world-skill/outcome-cards-check-world-swordplay",
  experience: 44,
  attribute: "metric-character-stat/outcome-cards-check-player-strength",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies CharacterSkill
