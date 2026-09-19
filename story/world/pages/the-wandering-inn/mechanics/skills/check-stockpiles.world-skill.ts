import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const checkStockpiles = {
  id: "01a06575-97fb-7df0-8425-f8de8299c31d",
  type: "page-type/world-skill",
  slug: "check-stockpiles",
  title: "Check Stockpiles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
