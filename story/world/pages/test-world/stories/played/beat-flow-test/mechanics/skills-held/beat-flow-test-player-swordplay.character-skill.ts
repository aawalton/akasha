import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const beatFlowTestPlayerSwordplay = {
  id: "01a17f7f-6e81-786a-ac24-829a1a145ae1",
  type: "page-type/character-skill",
  slug: "beat-flow-test-player-swordplay",
  world: "world/test-world",
  character: "character-player/beat-flow-test-player",
  skill: "world-skill/test-world-swordplay",
  experience: 35,
  attribute: "metric-character-stat/beat-flow-test-player-strength",
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies CharacterSkill
