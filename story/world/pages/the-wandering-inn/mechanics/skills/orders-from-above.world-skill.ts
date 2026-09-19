import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ordersFromAbove = {
  id: "01a0657d-027c-772b-8e4c-366e824627f4",
  type: "page-type/world-skill",
  slug: "orders-from-above",
  title: "Orders from Above",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
