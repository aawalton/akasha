import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ambitionsRealized = {
  id: "01a0d5f8-02f7-7c74-95cd-9304e809dca7",
  type: "page-type/temper-lore-book",
  slug: "ambitions-realized",
  title: "Ambitions Realized",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6720,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
