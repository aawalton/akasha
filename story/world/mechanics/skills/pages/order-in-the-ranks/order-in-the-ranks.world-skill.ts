import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const orderInTheRanks = {
  id: "01a0657d-027c-74d9-936a-0d912ee1a734",
  type: "page-type/world-skill",
  slug: "order-in-the-ranks",
  title: "Order in the Ranks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
