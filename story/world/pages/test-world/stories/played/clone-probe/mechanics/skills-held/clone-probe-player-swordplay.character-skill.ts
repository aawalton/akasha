import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const cloneProbePlayerSwordplay = {
  id: "01a17f4c-d936-7714-a37a-fd49af6a2ad7",
  type: "page-type/character-skill",
  slug: "clone-probe-player-swordplay",
  world: "world/test-world",
  character: "character-player/clone-probe-player",
  skill: "world-skill/test-world-swordplay",
  experience: 48,
  attribute: "metric-character-stat/clone-probe-player-strength",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies CharacterSkill
