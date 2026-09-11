import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greaterCharisma = {
  id: "01a06575-9816-7834-9498-8bda8df979de",
  type: "world-skill",
  slug: "greater-charisma",
  title: "Greater Charisma",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["lesser-charisma"],
  references: "jsonl",
} as const satisfies WorldSkill
