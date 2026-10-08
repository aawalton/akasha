import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wineConnoisseur = {
  id: "01a0657e-0271-7813-afe3-2e00e7e53d81",
  type: "page-type/world-class",
  slug: "wine-connoisseur",
  title: "Wine Connoisseur",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.113Z",
  updatedAt: "2026-09-22T13:30:28.000Z",
} as const satisfies WorldClass
