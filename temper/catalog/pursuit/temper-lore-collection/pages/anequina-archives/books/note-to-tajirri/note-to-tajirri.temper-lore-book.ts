import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToTajirri = {
  id: "01a0d60b-2345-7275-a4d6-271807bf0f89",
  type: "page-type/temper-lore-book",
  slug: "note-to-tajirri",
  title: "Note to Tajirri",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5398,
  bookIndex: 14,
  charted: true,
  quest: 6311,
  positions: "jsonl",
} as const satisfies TemperLoreBook
