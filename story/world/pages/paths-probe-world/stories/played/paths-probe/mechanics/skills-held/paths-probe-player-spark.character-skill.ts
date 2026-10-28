import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pathsProbePlayerSpark = {
  id: "01a18008-7534-791d-81d0-0c5a579c2d66",
  type: "page-type/character-skill",
  slug: "paths-probe-player-spark",
  world: "world/paths-probe-world",
  character: "character-player/paths-probe-player",
  skill: "world-skill/paths-probe-world-spark",
  experience: 10,
  dormant: true,
  attribute: "metric-character-stat/paths-probe-player-wits",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:04:27.937Z",
} as const satisfies CharacterSkill
