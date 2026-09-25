import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wronglyIncarcerated = {
  id: "01a0d5f1-f452-7b1e-a9b5-4abdba3e265d",
  type: "page-type/temper-lore-book",
  slug: "wrongly-incarcerated",
  title: "Wrongly Incarcerated!",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 7318,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
