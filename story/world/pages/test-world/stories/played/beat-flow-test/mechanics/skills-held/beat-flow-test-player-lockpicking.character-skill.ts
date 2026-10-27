import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const beatFlowTestPlayerLockpicking = {
  id: "01a17f7f-6e81-7a15-b1f8-607f50c81c8f",
  type: "page-type/character-skill",
  slug: "beat-flow-test-player-lockpicking",
  world: "world/test-world",
  character: "character-player/beat-flow-test-player",
  skill: "world-skill/test-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/beat-flow-test-player-agility",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies CharacterSkill
