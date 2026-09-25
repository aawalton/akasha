import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToShirnama = {
  id: "01a0d60b-4e02-7941-9aab-514f5f414d27",
  type: "page-type/temper-lore-book",
  slug: "letter-to-shirnama",
  title: "Letter to Shirnama",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5665,
  bookIndex: 7,
  charted: true,
  quest: 6399,
  positions: "jsonl",
} as const satisfies TemperLoreBook
