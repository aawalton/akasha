import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const kitchenDelivery = {
  id: "01a06575-9821-7aa5-932e-fe5e9de7a414",
  type: "world-skill",
  slug: "kitchen-delivery",
  title: "Kitchen Delivery",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
