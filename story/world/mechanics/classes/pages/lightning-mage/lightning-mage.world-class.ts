import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lightningMage = {
  id: "01a0657e-138e-7b13-a91e-065378bb3bd2",
  type: "page-type/world-class",
  slug: "lightning-mage",
  title: "Lightning Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
