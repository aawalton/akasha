import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedEndurance = {
  id: "01a06575-9808-78e0-9feb-31a3765a104b",
  type: "page-type/world-skill",
  slug: "enhanced-endurance",
  title: "Enhanced Endurance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
