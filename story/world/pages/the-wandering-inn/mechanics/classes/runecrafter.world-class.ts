import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const runecrafter = {
  id: "01a0657e-0249-7f05-ab45-e4561aa44a69",
  type: "page-type/world-class",
  slug: "runecrafter",
  title: "Runecrafter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
