import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const doubleShot = {
  id: "01a06575-9805-731e-a1f9-da06ea49cb08",
  type: "world-skill",
  slug: "double-shot",
  title: "Double Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
