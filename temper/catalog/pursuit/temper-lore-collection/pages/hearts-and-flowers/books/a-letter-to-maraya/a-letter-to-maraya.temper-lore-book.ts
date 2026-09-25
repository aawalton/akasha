import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aLetterToMaraya = {
  id: "01a0d5f2-af6f-7d4c-91f0-c1e5babd3c96",
  type: "page-type/temper-lore-book",
  slug: "a-letter-to-maraya",
  title: "A Letter to Maraya",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2478,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
