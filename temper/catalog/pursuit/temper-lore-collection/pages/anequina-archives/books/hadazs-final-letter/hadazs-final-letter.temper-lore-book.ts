import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hadazsFinalLetter = {
  id: "01a0d60b-2345-7c39-aade-9edee5ab7659",
  type: "page-type/temper-lore-book",
  slug: "hadazs-final-letter",
  title: "Hadaz's Final Letter",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5400,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
