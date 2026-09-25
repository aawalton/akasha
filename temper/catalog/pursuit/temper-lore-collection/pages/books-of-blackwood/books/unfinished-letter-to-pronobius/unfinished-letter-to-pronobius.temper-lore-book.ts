import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unfinishedLetterToPronobius = {
  id: "01a0d60b-fdb1-72bf-90ba-508cd8184cbb",
  type: "page-type/temper-lore-book",
  slug: "unfinished-letter-to-pronobius",
  title: "Unfinished Letter to Pronobius",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6678,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
