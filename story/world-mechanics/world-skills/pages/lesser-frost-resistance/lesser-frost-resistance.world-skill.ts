import type { WorldSkill } from "../../world-skill.page-type.ts"

export const lesserFrostResistance = {
  id: "01a06575-9822-7d14-9a70-60a228df2056",
  pageTypeSlug: "world-skill",
  slug: "lesser-frost-resistance",
  title: "Lesser Frost Resistance",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["greater-frost-resistance"],
  references: "jsonl",
} as const satisfies WorldSkill
