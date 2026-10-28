import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const outcomeCardTrialPlayerSwordplay = {
  id: "01a183ae-dc71-7367-b880-6d6f5093150c",
  type: "page-type/character-skill",
  slug: "outcome-card-trial-player-swordplay",
  world: "world/outcome-card-trial-world",
  character: "character-player/outcome-card-trial-player",
  skill: "world-skill/outcome-card-trial-world-swordplay",
  experience: 44,
  attribute: "metric-character-stat/outcome-card-trial-player-strength",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies CharacterSkill
