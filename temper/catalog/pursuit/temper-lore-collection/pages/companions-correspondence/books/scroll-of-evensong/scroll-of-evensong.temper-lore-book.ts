import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrollOfEvensong = {
  id: "01a0d60d-bbe4-70ed-be5d-da235aa2900c",
  type: "page-type/temper-lore-book",
  slug: "scroll-of-evensong",
  title: "Scroll of Evensong",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8139,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
