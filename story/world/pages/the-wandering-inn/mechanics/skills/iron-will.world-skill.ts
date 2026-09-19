import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ironWill = {
  id: "01a06575-9820-7df9-8049-6b5000f77a2d",
  type: "page-type/world-skill",
  slug: "iron-will",
  title: "Iron Will",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
