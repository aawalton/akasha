import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const increasedCarryWeight = {
  id: "01a06575-981e-76f9-89e2-5f1a1ebb24b8",
  type: "page-type/world-skill",
  slug: "increased-carry-weight",
  title: "Increased Carry Weight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
