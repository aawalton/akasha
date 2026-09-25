import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromMagisterOsanne = {
  id: "01a0d5f4-c388-7928-b190-97b2308bbf66",
  type: "page-type/temper-lore-book",
  slug: "note-from-magister-osanne",
  title: "Note from Magister Osanne",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1284,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
