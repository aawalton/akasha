import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mouthVabdrusJournal = {
  id: "01a0d60c-eb9b-70dd-968b-f23054013b04",
  type: "page-type/temper-lore-book",
  slug: "mouth-vabdrus-journal",
  title: "Mouth Vabdru's Journal",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7564,
  bookIndex: 13,
  charted: true,
  quest: 6973,
  positions: "jsonl",
} as const satisfies TemperLoreBook
