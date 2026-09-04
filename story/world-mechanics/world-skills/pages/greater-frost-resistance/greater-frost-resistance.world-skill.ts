import type { WorldSkill } from "../../world-skill.page-type.ts"

export const greaterFrostResistance = {
  id: "01a06575-9817-78f6-87c8-a53f4fbaf014",
  pageTypeSlug: "world-skill",
  slug: "greater-frost-resistance",
  title: "Greater Frost Resistance",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["lesser-frost-resistance"],
  references: "jsonl",
} as const satisfies WorldSkill
