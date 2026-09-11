import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greatCleave = {
  id: "01a06575-9816-719f-95a0-3fe61d8cd3f0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "great-cleave",
  title: "Great Cleave",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
