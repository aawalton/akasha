import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const inventoryTrickleOfReplenishment = {
  id: "01a06575-9820-7428-a029-be4e84bcc162",
  type: "page-type/world-skill",
  slug: "inventory-trickle-of-replenishment",
  title: "Inventory: Trickle of Replenishment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
