import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const weakFrostResistance = {
  id: "01a0657d-032d-7d73-90d3-96c6d5781af1",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "weak-frost-resistance",
  title: "Weak Frost Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
