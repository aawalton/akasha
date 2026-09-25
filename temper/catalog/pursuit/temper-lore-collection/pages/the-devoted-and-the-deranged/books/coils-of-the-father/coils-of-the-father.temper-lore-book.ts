import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const coilsOfTheFather = {
  id: "01a0d5f5-abb9-730f-ba58-e2f9f989b382",
  type: "page-type/temper-lore-book",
  slug: "coils-of-the-father",
  title: "Coils of the Father",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 763,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
