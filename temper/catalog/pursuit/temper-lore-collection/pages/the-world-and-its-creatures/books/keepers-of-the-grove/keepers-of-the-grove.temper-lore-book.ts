import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const keepersOfTheGrove = {
  id: "01a0d5f5-f3e4-76aa-9cfd-868aa09ff3c1",
  type: "page-type/temper-lore-book",
  slug: "keepers-of-the-grove",
  title: "Keepers of the Grove",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 376,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
