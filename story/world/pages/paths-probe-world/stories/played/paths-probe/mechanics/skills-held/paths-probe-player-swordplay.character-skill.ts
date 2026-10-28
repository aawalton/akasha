import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const pathsProbePlayerSwordplay = {
  id: "01a18008-7534-797f-ac80-900973376ed7",
  type: "page-type/character-skill",
  slug: "paths-probe-player-swordplay",
  world: "world/paths-probe-world",
  character: "character-player/paths-probe-player",
  skill: "world-skill/paths-probe-world-swordplay",
  dormant: true,
  experience: 25,
  attribute: "metric-character-stat/paths-probe-player-strength",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:44:01.818Z",
} as const satisfies CharacterSkill
