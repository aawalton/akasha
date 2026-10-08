import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserCharisma = {
  id: "01a06575-9822-7dc3-be9e-2c606f3fbc4f",
  type: "page-type/world-skill",
  slug: "lesser-charisma",
  title: "Lesser Charisma",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesToSlugs: ["world-skill/greater-charisma"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
