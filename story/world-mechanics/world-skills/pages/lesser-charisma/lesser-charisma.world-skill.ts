import type { WorldSkill } from "../../world-skill.page-type.ts"

export const lesserCharisma = {
  id: "01a06575-9822-7dc3-be9e-2c606f3fbc4f",
  pageTypeSlug: "world-skill",
  slug: "lesser-charisma",
  title: "Lesser Charisma",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["greater-charisma"],
  references: "jsonl",
} as const satisfies WorldSkill
