import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enhancedMovement = {
  id: "01a06575-9808-7276-a884-ce1be3c9b397",
  type: "world-skill",
  slug: "enhanced-movement",
  title: "Enhanced Movement",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
