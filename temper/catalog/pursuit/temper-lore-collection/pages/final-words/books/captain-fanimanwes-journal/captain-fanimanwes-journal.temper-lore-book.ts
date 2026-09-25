import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainFanimanwesJournal = {
  id: "01a0d5f6-45ad-7c2c-a2b0-9d344b711cdb",
  type: "page-type/temper-lore-book",
  slug: "captain-fanimanwes-journal",
  title: "Captain Fanimanwe's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1612,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
