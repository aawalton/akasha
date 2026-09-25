import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const perfumedLetter = {
  id: "01a0d5f2-af70-7015-9311-fc0ec71be306",
  type: "page-type/temper-lore-book",
  slug: "perfumed-letter",
  title: "Perfumed Letter",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 398,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
