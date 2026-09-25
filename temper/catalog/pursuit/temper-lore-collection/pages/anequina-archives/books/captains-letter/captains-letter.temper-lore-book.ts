import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainsLetter = {
  id: "01a0d60b-2344-72c6-8a97-124310bf2061",
  type: "page-type/temper-lore-book",
  slug: "captains-letter",
  title: "Captain's Letter",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5470,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
