import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goodnightMundus = {
  id: "01a0d5f6-1c15-71cf-acd6-dbdc91a528df",
  type: "page-type/temper-lore-book",
  slug: "goodnight-mundus",
  title: "Goodnight Mundus",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1163,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
