import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const instructionsForPlacement = {
  id: "01a0d5f1-f451-75d1-b07f-d3fe933acff2",
  type: "page-type/temper-lore-book",
  slug: "instructions-for-placement",
  title: "Instructions for Placement",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 525,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
