import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const leakCheck = {
  id: "01a06575-9822-780e-8ba5-75920f4bffda",
  type: "world-skill",
  slug: "leak-check",
  title: "Leak Check",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
