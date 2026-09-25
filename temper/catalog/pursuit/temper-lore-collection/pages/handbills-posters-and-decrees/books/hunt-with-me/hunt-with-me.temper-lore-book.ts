import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const huntWithMe = {
  id: "01a0d5f2-83a2-713b-8336-47b985666d83",
  type: "page-type/temper-lore-book",
  slug: "hunt-with-me",
  title: "Hunt With Me",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2131,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
