import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const songOfTheProwler = {
  id: "01a0d5f7-73fa-73fc-8b32-68f3a65ba5a1",
  type: "page-type/temper-lore-book",
  slug: "song-of-the-prowler",
  title: "Song of the Prowler",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3679,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
