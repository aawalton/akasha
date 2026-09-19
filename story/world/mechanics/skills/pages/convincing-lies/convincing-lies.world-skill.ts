import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const convincingLies = {
  id: "01a06575-97fd-7e60-ab17-154de4c7ed6d",
  type: "page-type/world-skill",
  slug: "convincing-lies",
  title: "Convincing Lies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
