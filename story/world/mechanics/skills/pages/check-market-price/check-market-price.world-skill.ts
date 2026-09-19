import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const checkMarketPrice = {
  id: "01a06575-97fb-71bf-b247-3c413a596875",
  type: "page-type/world-skill",
  slug: "check-market-price",
  title: "Check Market Price",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
