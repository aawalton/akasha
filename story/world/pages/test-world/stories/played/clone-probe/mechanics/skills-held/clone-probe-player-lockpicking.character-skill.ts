import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const cloneProbePlayerLockpicking = {
  id: "01a17f3e-4458-71f9-8600-e68dd5b3105d",
  type: "page-type/character-skill",
  slug: "clone-probe-player-lockpicking",
  world: "world/test-world",
  character: "character-player/clone-probe-player",
  skill: "world-skill/test-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/clone-probe-player-agility",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies CharacterSkill
