import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const establishBond = {
  id: "01a06575-9809-738d-acb9-523224c568a6",
  type: "world-skill",
  slug: "establish-bond",
  title: "Establish Bond",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
