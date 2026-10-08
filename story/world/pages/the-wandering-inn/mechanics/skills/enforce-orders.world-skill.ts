import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enforceOrders = {
  id: "01a06575-9808-7dcd-827b-87ad951290ab",
  type: "page-type/world-skill",
  slug: "enforce-orders",
  title: "Enforce Orders",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.584Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
