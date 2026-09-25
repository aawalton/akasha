import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aureliasLetter = {
  id: "01a0d60c-75b4-7f97-a43e-f1df26bc012a",
  type: "page-type/temper-lore-book",
  slug: "aurelias-letter",
  title: "Aurelia's Letter",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7115,
  bookIndex: 65,
  charted: true,
  quest: 6791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
