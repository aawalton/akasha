import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enforceOrders = {
  id: "01a06575-9808-7dcd-827b-87ad951290ab",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "enforce-orders",
  title: "Enforce Orders",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
