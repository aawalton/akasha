import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enhancedGrip = {
  id: "01a06575-9808-71d2-9e58-6c502fe222c3",
  type: "world-skill",
  slug: "enhanced-grip",
  title: "Enhanced Grip",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
