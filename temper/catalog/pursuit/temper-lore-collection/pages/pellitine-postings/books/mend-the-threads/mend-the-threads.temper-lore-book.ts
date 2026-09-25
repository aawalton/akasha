import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mendTheThreads = {
  id: "01a0d60b-4e03-7f5b-8fdd-5c490ee3ec91",
  type: "page-type/temper-lore-book",
  slug: "mend-the-threads",
  title: "Mend the Threads",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5732,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
