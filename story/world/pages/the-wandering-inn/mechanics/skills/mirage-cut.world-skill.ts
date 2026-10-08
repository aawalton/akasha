import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mirageCut = {
  id: "01a0657d-026f-7581-8e3a-43756c4f5947",
  type: "page-type/world-skill",
  slug: "mirage-cut",
  title: "Mirage Cut",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  evolvesFromSlugs: ["world-skill/power-strike"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.575Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
