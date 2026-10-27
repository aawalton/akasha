import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const probeTwoPlayerSpark = {
  id: "01a17fbf-aff5-7df4-9dc3-21484d160c81",
  type: "page-type/character-skill",
  slug: "probe-two-player-spark",
  world: "world/probe-two-world",
  character: "character-player/probe-two-player",
  skill: "world-skill/probe-two-world-spark",
  experience: 12,
  attribute: "metric-character-stat/probe-two-player-wits",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies CharacterSkill
