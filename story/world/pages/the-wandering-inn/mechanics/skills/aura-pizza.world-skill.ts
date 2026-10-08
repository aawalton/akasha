import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraPizza = {
  id: "01a06575-97f0-79a5-987e-4203df171a30",
  type: "page-type/world-skill",
  slug: "aura-pizza",
  title: "Aura Pizza",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.560Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
