import type { WorldSkill } from "../../world-skill.page-type.ts"

export const greaterCharisma = {
  id: "01a06575-9816-7834-9498-8bda8df979de",
  pageTypeSlug: "world-skill",
  slug: "greater-charisma",
  title: "Greater Charisma",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["lesser-charisma"],
  references: "jsonl",
} as const satisfies WorldSkill
