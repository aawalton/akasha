import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mischiefBank = {
  id: "01a0657d-026f-7cac-96bc-792bce5ab5d6",
  type: "page-type/world-skill",
  slug: "mischief-bank",
  title: "Mischief Bank",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
