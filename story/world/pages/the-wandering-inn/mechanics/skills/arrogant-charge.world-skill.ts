import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrogantCharge = {
  id: "01a06575-97ed-78a3-98d5-e425df601dc4",
  type: "page-type/world-skill",
  slug: "arrogant-charge",
  title: "Arrogant Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
