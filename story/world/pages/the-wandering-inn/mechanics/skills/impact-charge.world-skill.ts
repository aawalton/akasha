import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const impactCharge = {
  id: "01a06575-981d-70ce-aa2e-823180ce206a",
  type: "page-type/world-skill",
  slug: "impact-charge",
  title: "Impact Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
