import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const followTheStory = {
  id: "01a06575-980f-7d84-a1be-dbb7c25ec74a",
  type: "page-type/world-skill",
  slug: "follow-the-story",
  title: "Follow the Story",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.591Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
