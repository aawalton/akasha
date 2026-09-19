import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedDurabilityOars = {
  id: "01a06575-9808-75a9-8714-e3611cd1c460",
  type: "page-type/world-skill",
  slug: "enhanced-durability-oars",
  title: "Enhanced Durability – Oars",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
