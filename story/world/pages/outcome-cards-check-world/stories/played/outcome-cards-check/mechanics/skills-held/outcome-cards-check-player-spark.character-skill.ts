import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const outcomeCardsCheckPlayerSpark = {
  id: "01a17ffe-7d82-7c4e-9e67-911c01707894",
  type: "page-type/character-skill",
  slug: "outcome-cards-check-player-spark",
  world: "world/outcome-cards-check-world",
  character: "character-player/outcome-cards-check-player",
  skill: "world-skill/outcome-cards-check-world-spark",
  experience: 12,
  attribute: "metric-character-stat/outcome-cards-check-player-wits",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies CharacterSkill
