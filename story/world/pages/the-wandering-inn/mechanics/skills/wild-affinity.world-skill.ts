import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildAffinity = {
  id: "01a0657d-032e-70c7-a238-309eb38e8f23",
  type: "page-type/world-skill",
  slug: "wild-affinity",
  title: "Wild Affinity",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-skill/peace-of-the-wild"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.766Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
