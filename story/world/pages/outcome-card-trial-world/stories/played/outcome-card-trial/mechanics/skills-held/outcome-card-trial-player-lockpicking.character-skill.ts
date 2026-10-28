import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const outcomeCardTrialPlayerLockpicking = {
  id: "01a183ae-dc71-712e-a78a-d5527ff74c5b",
  type: "page-type/character-skill",
  slug: "outcome-card-trial-player-lockpicking",
  world: "world/outcome-card-trial-world",
  character: "character-player/outcome-card-trial-player",
  skill: "world-skill/outcome-card-trial-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/outcome-card-trial-player-agility",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies CharacterSkill
