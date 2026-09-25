import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wenayasille = {
  id: "01a0d5f4-07b9-782f-9dc0-1ab24f54a7a5",
  type: "page-type/temper-lore-book",
  slug: "wenayasille",
  title: "Wenayasille",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2161,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
