import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const cloneProbePlayerSwordplay = {
  id: "01a17f3e-4458-7b8d-87b2-b81017174252",
  type: "page-type/character-skill",
  slug: "clone-probe-player-swordplay",
  world: "world/test-world",
  character: "character-player/clone-probe-player",
  skill: "world-skill/test-world-swordplay",
  experience: 48,
  attribute: "metric-character-stat/clone-probe-player-strength",
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies CharacterSkill
