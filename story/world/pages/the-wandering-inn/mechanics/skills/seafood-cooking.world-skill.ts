import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seafoodCooking = {
  id: "01a0657d-02b8-74a4-aeb6-228791da209c",
  type: "page-type/world-skill",
  slug: "seafood-cooking",
  title: "Seafood Cooking",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-skill/basic-cooking"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.648Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
