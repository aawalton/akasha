import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wabbajack = {
  id: "01a0d5e3-e98c-7a52-8fbc-f6fa2cf0bf5e",
  type: "page-type/temper-lore-book",
  slug: "wabbajack",
  title: "Wabbajack",
  collection: "temper-lore-collection/literature",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
