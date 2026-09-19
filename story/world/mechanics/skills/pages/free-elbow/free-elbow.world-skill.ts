import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const freeElbow = {
  id: "01a06575-9810-7182-907a-77a895d620b1",
  type: "page-type/world-skill",
  slug: "free-elbow",
  title: "Free Elbow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
