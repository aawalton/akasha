import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const deathMage = {
  id: "01a0657e-1351-72af-92f2-a07cc221c5cd",
  type: "page-type/world-class",
  slug: "death-mage",
  title: "Death Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
