import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const nudgeCustomers = {
  id: "01a0657d-027b-7492-9ea8-4e736ebc2b76",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "nudge-customers",
  title: "Nudge Customers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
