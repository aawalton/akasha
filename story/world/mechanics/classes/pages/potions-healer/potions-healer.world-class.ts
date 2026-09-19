import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const potionsHealer = {
  id: "01a06586-0a0b-782d-a1a7-a6862e2f8fd7",
  type: "page-type/world-class",
  slug: "potions-healer",
  title: "Potions Healer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
