import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enforceOrders = {
  id: "01a06575-9808-7dcd-827b-87ad951290ab",
  type: "page-type/world-skill",
  slug: "enforce-orders",
  title: "Enforce Orders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
