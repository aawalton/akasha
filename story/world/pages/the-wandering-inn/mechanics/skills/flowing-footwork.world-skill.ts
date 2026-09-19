import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flowingFootwork = {
  id: "01a06575-980e-78bb-9be6-f5d112aa74a5",
  type: "page-type/world-skill",
  slug: "flowing-footwork",
  title: "Flowing Footwork",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
