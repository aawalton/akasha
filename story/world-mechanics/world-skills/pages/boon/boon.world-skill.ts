import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const boon = {
  id: "01a06575-97f8-75b8-b4ff-498851e43c69",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "boon",
  title: "Boon",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
