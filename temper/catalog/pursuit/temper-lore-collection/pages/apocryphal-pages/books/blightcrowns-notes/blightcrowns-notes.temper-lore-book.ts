import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blightcrownsNotes = {
  id: "01a0d60d-156d-7afa-ad91-baff8deb4b15",
  type: "page-type/temper-lore-book",
  slug: "blightcrowns-notes",
  title: "Blightcrown's Notes",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7566,
  bookIndex: 4,
  charted: true,
  quest: 6975,
  positions: "jsonl",
} as const satisfies TemperLoreBook
