import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const testStoryPlayerSwordplay = {
  id: "01a17ec7-b0a5-7715-9de3-637709904b6d",
  type: "page-type/character-skill",
  slug: "test-story-player-swordplay",
  world: "world/test-world",
  character: "character-player/test-story-player",
  skill: "world-skill/test-world-swordplay",
  experience: 35,
  attribute: "metric-character-stat/test-story-player-strength",
  createdAt: "2026-10-27T19:12:58.532Z",
  updatedAt: "2026-10-27T19:12:58.532Z",
} as const satisfies CharacterSkill
