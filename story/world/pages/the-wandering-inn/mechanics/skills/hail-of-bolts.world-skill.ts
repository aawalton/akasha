import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hailOfBolts = {
  id: "01a06575-9818-7e09-9d57-ec157d0432eb",
  type: "page-type/world-skill",
  slug: "hail-of-bolts",
  title: "Hail of Bolts",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.600Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
