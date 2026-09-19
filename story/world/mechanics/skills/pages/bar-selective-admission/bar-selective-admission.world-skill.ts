import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barSelectiveAdmission = {
  id: "01a06575-97f3-79dd-8d1f-557e0e5e2e9c",
  type: "page-type/world-skill",
  slug: "bar-selective-admission",
  title: "Bar: Selective Admission",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
