import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserFrostResistance = {
  id: "01a06575-9822-7d14-9a70-60a228df2056",
  type: "page-type/world-skill",
  slug: "lesser-frost-resistance",
  title: "Lesser Frost Resistance",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["greater-frost-resistance"],
  references: "jsonl",
} as const satisfies WorldSkill
