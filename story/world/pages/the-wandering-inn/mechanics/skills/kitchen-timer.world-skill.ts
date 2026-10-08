import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kitchenTimer = {
  id: "01a06575-9821-7471-9b2e-08179bf60826",
  type: "page-type/world-skill",
  slug: "kitchen-timer",
  title: "Kitchen Timer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
