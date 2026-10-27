import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const testStoryPlayerSpark = {
  id: "01a17ec7-b0a5-749c-9531-bcb5f0872535",
  type: "page-type/character-skill",
  slug: "test-story-player-spark",
  world: "world/test-world",
  character: "character-player/test-story-player",
  skill: "world-skill/test-world-spark",
  experience: 12,
  attribute: "metric-character-stat/test-story-player-wits",
  createdAt: "2026-10-27T19:12:58.532Z",
  updatedAt: "2026-10-27T19:12:58.532Z",
} as const satisfies CharacterSkill
