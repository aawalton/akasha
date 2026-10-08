import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicCooking = {
  id: "01a06575-97f3-701a-a96e-7a82e6472a21",
  type: "page-type/world-skill",
  slug: "basic-cooking",
  title: "Basic Cooking",
  world: "world/the-wandering-inn",
  appearanceCount: 23,
  evolvesToSlugs: ["world-skill/seafood-cooking"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
