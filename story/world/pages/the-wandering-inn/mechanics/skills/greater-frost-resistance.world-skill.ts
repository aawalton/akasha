import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterFrostResistance = {
  id: "01a06575-9817-78f6-87c8-a53f4fbaf014",
  type: "page-type/world-skill",
  slug: "greater-frost-resistance",
  title: "Greater Frost Resistance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/lesser-frost-resistance"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.599Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
