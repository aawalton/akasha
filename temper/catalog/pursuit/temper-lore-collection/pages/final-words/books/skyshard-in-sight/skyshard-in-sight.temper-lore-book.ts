import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skyshardInSight = {
  id: "01a0d5f6-45ae-712a-9c03-c0d1ef35e2be",
  type: "page-type/temper-lore-book",
  slug: "skyshard-in-sight",
  title: "Skyshard in Sight!",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2222,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
