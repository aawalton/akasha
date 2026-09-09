import type { WorldSkill } from "../../world-skill.page-type.ts"

export const basicProficiencySwords = {
  id: "01a06575-97f4-7fd3-87ef-a35cf8378dac",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-proficiency-swords",
  title: "Basic Proficiency: Swords",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
