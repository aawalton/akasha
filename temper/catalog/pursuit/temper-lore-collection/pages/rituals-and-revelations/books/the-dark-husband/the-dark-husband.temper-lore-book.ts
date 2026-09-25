import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDarkHusband = {
  id: "01a0d5f5-444c-7235-b3e2-9f40af2730cd",
  type: "page-type/temper-lore-book",
  slug: "the-dark-husband",
  title: "The Dark Husband",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 673,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
