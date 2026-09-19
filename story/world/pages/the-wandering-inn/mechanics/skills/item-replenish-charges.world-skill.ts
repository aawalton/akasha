import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const itemReplenishCharges = {
  id: "01a06575-9820-7a38-903c-b5286cec91ac",
  type: "page-type/world-skill",
  slug: "item-replenish-charges",
  title: "Item: Replenish Charges",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
