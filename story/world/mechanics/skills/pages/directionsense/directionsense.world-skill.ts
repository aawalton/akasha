import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const directionsense = {
  id: "01a06575-9803-7fe3-96ba-7aa992c5cd81",
  type: "page-type/world-skill",
  slug: "directionsense",
  title: "Directionsense",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
