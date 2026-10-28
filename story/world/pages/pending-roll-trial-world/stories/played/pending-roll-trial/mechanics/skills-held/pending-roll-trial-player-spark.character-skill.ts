import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pendingRollTrialPlayerSpark = {
  id: "01a183cf-b828-7e67-84a4-f065760da1a8",
  type: "page-type/character-skill",
  slug: "pending-roll-trial-player-spark",
  world: "world/pending-roll-trial-world",
  character: "character-player/pending-roll-trial-player",
  skill: "world-skill/pending-roll-trial-world-spark",
  experience: 12,
  attribute: "metric-character-stat/pending-roll-trial-player-wits",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies CharacterSkill
