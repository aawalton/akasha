import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const luciusTheStalwart = {
  id: "01a0d5f3-3fdb-7e8f-b621-5c3d099e163a",
  type: "page-type/temper-lore-book",
  slug: "lucius-the-stalwart",
  title: "Lucius the Stalwart",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1113,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
