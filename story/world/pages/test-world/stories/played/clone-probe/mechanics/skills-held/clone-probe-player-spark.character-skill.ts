import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const cloneProbePlayerSpark = {
  id: "01a17f3e-4458-7123-8d7d-cf1b84ecf83e",
  type: "page-type/character-skill",
  slug: "clone-probe-player-spark",
  world: "world/test-world",
  character: "character-player/clone-probe-player",
  skill: "world-skill/test-world-spark",
  experience: 12,
  attribute: "metric-character-stat/clone-probe-player-wits",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies CharacterSkill
