import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const testStoryPlayerLockpicking = {
  id: "01a17ec7-b0a4-7076-a062-633ada616bcc",
  type: "page-type/character-skill",
  slug: "test-story-player-lockpicking",
  world: "world/test-world",
  character: "character-player/test-story-player",
  skill: "world-skill/test-world-lockpicking",
  experience: 4,
  attribute: "metric-character-stat/test-story-player-agility",
  createdAt: "2026-10-27T19:12:58.532Z",
  updatedAt: "2026-10-27T19:12:58.532Z",
} as const satisfies CharacterSkill
