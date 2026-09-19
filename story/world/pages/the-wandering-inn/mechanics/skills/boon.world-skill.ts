import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boon = {
  id: "01a06575-97f8-75b8-b4ff-498851e43c69",
  type: "page-type/world-skill",
  slug: "boon",
  title: "Boon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
