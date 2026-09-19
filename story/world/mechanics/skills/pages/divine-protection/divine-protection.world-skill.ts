import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const divineProtection = {
  id: "01a06575-9804-7704-acb2-d7630032a04a",
  type: "page-type/world-skill",
  slug: "divine-protection",
  title: "Divine Protection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
