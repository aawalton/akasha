import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kitchenDelivery = {
  id: "01a06575-9821-7aa5-932e-fe5e9de7a414",
  type: "page-type/world-skill",
  slug: "kitchen-delivery",
  title: "Kitchen Delivery",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
