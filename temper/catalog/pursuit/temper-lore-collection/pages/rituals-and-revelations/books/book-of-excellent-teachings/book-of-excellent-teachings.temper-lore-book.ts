import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bookOfExcellentTeachings = {
  id: "01a0d5f5-444b-788b-9c2c-94d977c24e32",
  type: "page-type/temper-lore-book",
  slug: "book-of-excellent-teachings",
  title: "Book of Excellent Teachings",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 701,
  bookIndex: 15,
  charted: true,
  quest: 3903,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:55.947Z",
  updatedAt: "2026-09-25T00:26:58.000Z",
} as const satisfies TemperLoreBook
