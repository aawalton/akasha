import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enhancedEndurance = {
  id: "01a06575-9808-78e0-9feb-31a3765a104b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "enhanced-endurance",
  title: "Enhanced Endurance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
