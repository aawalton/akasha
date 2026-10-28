import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const outcomeCardTrialPlayerSpark = {
  id: "01a183ae-dc71-7273-a610-e369254489e1",
  type: "page-type/character-skill",
  slug: "outcome-card-trial-player-spark",
  world: "world/outcome-card-trial-world",
  character: "character-player/outcome-card-trial-player",
  skill: "world-skill/outcome-card-trial-world-spark",
  experience: 12,
  attribute: "metric-character-stat/outcome-card-trial-player-wits",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies CharacterSkill
