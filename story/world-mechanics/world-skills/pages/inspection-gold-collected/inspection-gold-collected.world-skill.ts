import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const inspectionGoldCollected = {
  id: "01a06575-981f-7b2b-af24-8d4481b8d53b",
  type: "world-skill",
  slug: "inspection-gold-collected",
  title: "Inspection: Gold Collected",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
