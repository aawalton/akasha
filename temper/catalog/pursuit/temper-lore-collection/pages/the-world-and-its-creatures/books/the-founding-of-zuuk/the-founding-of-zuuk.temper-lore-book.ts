import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFoundingOfZuuk = {
  id: "01a0d5f5-f3e5-71fb-8b3e-72f2e7c25d43",
  type: "page-type/temper-lore-book",
  slug: "the-founding-of-zuuk",
  title: "The Founding of Zuuk",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 731,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
