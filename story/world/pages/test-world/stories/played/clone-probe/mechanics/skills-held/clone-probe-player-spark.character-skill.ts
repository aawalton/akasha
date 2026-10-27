import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const cloneProbePlayerSpark = {
  id: "01a17f4c-d936-7fe7-8f7b-596113a81b11",
  type: "page-type/character-skill",
  slug: "clone-probe-player-spark",
  world: "world/test-world",
  character: "character-player/clone-probe-player",
  skill: "world-skill/test-world-spark",
  experience: 12,
  attribute: "metric-character-stat/clone-probe-player-wits",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies CharacterSkill
