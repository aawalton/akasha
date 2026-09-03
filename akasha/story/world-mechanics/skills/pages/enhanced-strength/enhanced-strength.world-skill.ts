import type { WorldSkill } from "../../world-skill.page-type.ts"

export const enhancedStrength = {
  id: "01a06575-9809-70ad-b005-45a0d66a279a",
  pageTypeSlug: "world-skill",
  slug: "enhanced-strength",
  title: "Enhanced Strength",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["lesser-strength"],
  references: "jsonl",
} as const satisfies WorldSkill
