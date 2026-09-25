import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSeaElfThreat = {
  id: "01a0d60c-75b6-719e-bd05-4387872126c1",
  type: "page-type/temper-lore-book",
  slug: "the-sea-elf-threat",
  title: "The Sea Elf Threat",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7211,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
