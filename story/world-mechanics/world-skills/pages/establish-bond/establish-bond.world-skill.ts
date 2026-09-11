import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const establishBond = {
  id: "01a06575-9809-738d-acb9-523224c568a6",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "establish-bond",
  title: "Establish Bond",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
