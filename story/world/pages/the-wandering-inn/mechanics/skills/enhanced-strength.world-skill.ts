import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedStrength = {
  id: "01a06575-9809-70ad-b005-45a0d66a279a",
  type: "page-type/world-skill",
  slug: "enhanced-strength",
  title: "Enhanced Strength",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["lesser-strength"],
  references: "jsonl",
} as const satisfies WorldSkill
