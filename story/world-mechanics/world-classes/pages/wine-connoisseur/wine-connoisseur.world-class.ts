import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const wineConnoisseur = {
  id: "01a0657e-0271-7813-afe3-2e00e7e53d81",
  type: "world-class",
  slug: "wine-connoisseur",
  title: "Wine Connoisseur",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
