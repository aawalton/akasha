import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDiscardedLetter = {
  id: "01a0d5f2-af6f-72ce-b0b4-3e5cda197132",
  type: "page-type/temper-lore-book",
  slug: "a-discarded-letter",
  title: "A Discarded Letter",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 648,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
