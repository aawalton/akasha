import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const probeTwoPlayerLockpicking = {
  id: "01a17fbf-aff5-7c2d-a667-08820e48ebe5",
  type: "page-type/character-skill",
  slug: "probe-two-player-lockpicking",
  world: "world/probe-two-world",
  character: "character-player/probe-two-player",
  skill: "world-skill/probe-two-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/probe-two-player-agility",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies CharacterSkill
