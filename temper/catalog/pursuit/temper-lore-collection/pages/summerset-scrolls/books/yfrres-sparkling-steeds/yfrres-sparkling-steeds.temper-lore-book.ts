import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yfrresSparklingSteeds = {
  id: "01a0d60a-d5be-74f3-afb6-493113e7c610",
  type: "page-type/temper-lore-book",
  slug: "yfrres-sparkling-steeds",
  title: "Y'frre's Sparkling Steeds",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5107,
  charted: true,
  quest: 6121,
  positions: "jsonl",
} as const satisfies TemperLoreBook
