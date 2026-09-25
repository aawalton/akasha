import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const imperialMutiny = {
  id: "01a0d5f4-c388-7df2-8491-f906edacf9d4",
  type: "page-type/temper-lore-book",
  slug: "imperial-mutiny",
  title: "Imperial Mutiny!",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2212,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
