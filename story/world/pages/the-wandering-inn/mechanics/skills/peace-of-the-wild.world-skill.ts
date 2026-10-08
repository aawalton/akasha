import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const peaceOfTheWild = {
  id: "01a0657d-028e-7050-8db9-6ea8d5446123",
  type: "page-type/world-skill",
  slug: "peace-of-the-wild",
  title: "Peace of the Wild",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-skill/wild-affinity"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.606Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
