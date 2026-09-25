import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theManyThreads = {
  id: "01a0d60b-4e03-77ec-9b5c-5e7c808ceb42",
  type: "page-type/temper-lore-book",
  slug: "the-many-threads",
  title: "The Many Threads",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5671,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
