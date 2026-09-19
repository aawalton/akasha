import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const estimateBridalPrice = {
  id: "01a06575-9809-7acf-8d5c-abc687b5838b",
  type: "page-type/world-skill",
  slug: "estimate-bridal-price",
  title: "Estimate Bridal Price",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
