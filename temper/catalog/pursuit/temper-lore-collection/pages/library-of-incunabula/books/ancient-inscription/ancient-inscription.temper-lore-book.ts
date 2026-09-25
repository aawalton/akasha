import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ancientInscription = {
  id: "01a0d5f8-02f7-74b5-9a6f-d5c229715166",
  type: "page-type/temper-lore-book",
  slug: "ancient-inscription",
  title: "Ancient Inscription",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6857,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
