import type { WorldSkill } from "../../world-skill.page-type.ts"

export const basicCleaning = {
  id: "01a06575-97f3-7906-a7ef-461259ab52b8",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-cleaning",
  title: "Basic Cleaning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
