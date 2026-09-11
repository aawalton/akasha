import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lesserCharisma = {
  id: "01a06575-9822-7dc3-be9e-2c606f3fbc4f",
  type: "world-skill",
  slug: "lesser-charisma",
  title: "Lesser Charisma",
  world: "the-wandering-inn",
  evolvesToSlugs: ["greater-charisma"],
  references: "jsonl",
} as const satisfies WorldSkill
