import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const compartmentsOfHolding = {
  id: "01a06575-97fc-7d9f-81bc-789a7e81f5d5",
  type: "page-type/world-skill",
  slug: "compartments-of-holding",
  title: "Compartments of Holding",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
