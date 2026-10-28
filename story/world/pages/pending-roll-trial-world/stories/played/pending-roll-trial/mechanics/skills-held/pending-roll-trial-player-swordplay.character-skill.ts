import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pendingRollTrialPlayerSwordplay = {
  id: "01a183cf-b828-7559-8d83-f51fcf99d925",
  type: "page-type/character-skill",
  slug: "pending-roll-trial-player-swordplay",
  world: "world/pending-roll-trial-world",
  character: "character-player/pending-roll-trial-player",
  skill: "world-skill/pending-roll-trial-world-swordplay",
  experience: 44,
  attribute: "metric-character-stat/pending-roll-trial-player-strength",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies CharacterSkill
