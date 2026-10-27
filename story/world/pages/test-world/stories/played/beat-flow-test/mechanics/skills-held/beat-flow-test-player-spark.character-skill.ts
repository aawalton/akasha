import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const beatFlowTestPlayerSpark = {
  id: "01a17f7f-6e81-73ca-90ed-f7476d6e416c",
  type: "page-type/character-skill",
  slug: "beat-flow-test-player-spark",
  world: "world/test-world",
  character: "character-player/beat-flow-test-player",
  skill: "world-skill/test-world-spark",
  experience: 12,
  attribute: "metric-character-stat/beat-flow-test-player-wits",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies CharacterSkill
