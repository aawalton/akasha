import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pendingRollTrialPlayerLockpicking = {
  id: "01a183cf-b828-7ae1-8d44-b40572fdc996",
  type: "page-type/character-skill",
  slug: "pending-roll-trial-player-lockpicking",
  world: "world/pending-roll-trial-world",
  character: "character-player/pending-roll-trial-player",
  skill: "world-skill/pending-roll-trial-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/pending-roll-trial-player-agility",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies CharacterSkill
