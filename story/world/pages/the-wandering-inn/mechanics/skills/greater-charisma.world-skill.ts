import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterCharisma = {
  id: "01a06575-9816-7834-9498-8bda8df979de",
  type: "page-type/world-skill",
  slug: "greater-charisma",
  title: "Greater Charisma",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/lesser-charisma"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.598Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
