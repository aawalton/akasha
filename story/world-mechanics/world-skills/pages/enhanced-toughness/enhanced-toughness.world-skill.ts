import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enhancedToughness = {
  id: "01a06575-9809-7e02-9205-67c2cad9592a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "enhanced-toughness",
  title: "Enhanced Toughness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
