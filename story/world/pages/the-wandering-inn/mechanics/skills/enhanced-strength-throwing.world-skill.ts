import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedStrengthThrowing = {
  id: "01a06575-9808-7ad1-9f3b-04e66ce71156",
  type: "page-type/world-skill",
  slug: "enhanced-strength-throwing",
  title: "Enhanced Strength: Throwing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
