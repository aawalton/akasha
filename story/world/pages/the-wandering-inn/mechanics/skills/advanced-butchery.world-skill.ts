import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedButchery = {
  id: "01a06575-97e9-7563-ac2f-a2b1939e1d89",
  type: "page-type/world-skill",
  slug: "advanced-butchery",
  title: "Advanced Butchery",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
