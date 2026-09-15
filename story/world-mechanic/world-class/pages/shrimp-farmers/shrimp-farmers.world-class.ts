import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const shrimpFarmers = {
  id: "01a06586-0a3c-7cea-af82-7b46cb997455",
  type: "world-class",
  slug: "shrimp-farmers",
  title: "Shrimp Farmers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
