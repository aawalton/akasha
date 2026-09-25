import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nordCuisineSavoryEdition = {
  id: "01a0d60b-8108-7e4a-9036-1dc0f2738bc2",
  type: "page-type/temper-lore-book",
  slug: "nord-cuisine-savory-edition",
  title: "Nord Cuisine: Savory Edition",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6081,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
