import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const restoredTablet = {
  id: "01a0d60b-4e03-73a6-b8d8-e54c0c763d0c",
  type: "page-type/temper-lore-book",
  slug: "restored-tablet",
  title: "Restored Tablet",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5660,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
