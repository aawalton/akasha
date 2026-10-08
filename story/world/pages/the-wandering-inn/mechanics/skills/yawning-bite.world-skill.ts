import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const yawningBite = {
  id: "01a0657d-0338-76c0-aa30-a6ebd94aba76",
  type: "page-type/world-skill",
  slug: "yawning-bite",
  title: "Yawning Bite",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-skill/huge-chomp"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.776Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
