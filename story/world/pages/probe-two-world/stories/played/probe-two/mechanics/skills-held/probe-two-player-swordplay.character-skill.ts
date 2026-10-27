import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const probeTwoPlayerSwordplay = {
  id: "01a17fbf-aff5-7166-879b-579b41b50514",
  type: "page-type/character-skill",
  slug: "probe-two-player-swordplay",
  world: "world/probe-two-world",
  character: "character-player/probe-two-player",
  skill: "world-skill/probe-two-world-swordplay",
  experience: 41,
  attribute: "metric-character-stat/probe-two-player-strength",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies CharacterSkill
