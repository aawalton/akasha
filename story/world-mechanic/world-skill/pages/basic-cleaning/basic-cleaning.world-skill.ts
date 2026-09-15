import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const basicCleaning = {
  id: "01a06575-97f3-7906-a7ef-461259ab52b8",
  type: "world-skill",
  slug: "basic-cleaning",
  title: "Basic Cleaning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
