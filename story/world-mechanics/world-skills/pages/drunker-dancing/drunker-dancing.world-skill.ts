import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const drunkerDancing = {
  id: "01a06575-9806-7191-a935-7d4cc06b7b0a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "drunker-dancing",
  title: "Drunker Dancing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
