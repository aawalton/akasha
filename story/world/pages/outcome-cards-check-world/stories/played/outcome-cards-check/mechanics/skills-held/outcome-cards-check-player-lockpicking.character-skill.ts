import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const outcomeCardsCheckPlayerLockpicking = {
  id: "01a17ffe-7d82-73e4-b736-1efacb9f9be1",
  type: "page-type/character-skill",
  slug: "outcome-cards-check-player-lockpicking",
  world: "world/outcome-cards-check-world",
  character: "character-player/outcome-cards-check-player",
  skill: "world-skill/outcome-cards-check-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/outcome-cards-check-player-agility",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies CharacterSkill
