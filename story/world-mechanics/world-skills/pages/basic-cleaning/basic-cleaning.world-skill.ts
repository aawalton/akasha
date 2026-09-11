import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicCleaning = {
  id: "01a06575-97f3-7906-a7ef-461259ab52b8",
  type: "world-skill",
  slug: "basic-cleaning",
  title: "Basic Cleaning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
