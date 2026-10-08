import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastGrowth = {
  id: "01a06575-980b-7c34-8c8e-f2d21429acb8",
  type: "page-type/world-skill",
  slug: "fast-growth",
  title: "Fast Growth",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.587Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
