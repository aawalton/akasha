import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shopkeeperSApprentice = {
  id: "01a06586-0a3b-7c7b-9f99-8aa23d86296d",
  type: "page-type/world-class",
  slug: "shopkeeper-s-apprentice",
  title: "Shopkeeper’s Apprentice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
