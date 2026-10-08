import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ghostSHand = {
  id: "01a06575-9814-7c1c-87dc-71c1023ce4c1",
  type: "page-type/world-skill",
  slug: "ghost-s-hand",
  title: "Ghost’s Hand",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-skill/royal-slap"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.596Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
