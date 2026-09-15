import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const followTheStory = {
  id: "01a06575-980f-7d84-a1be-dbb7c25ec74a",
  type: "world-skill",
  slug: "follow-the-story",
  title: "Follow the Story",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
