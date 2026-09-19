import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedNaturalHealing = {
  id: "01a06575-9808-7d8a-ae8f-3be9ab017fdb",
  type: "page-type/world-skill",
  slug: "enhanced-natural-healing",
  title: "Enhanced Natural Healing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
