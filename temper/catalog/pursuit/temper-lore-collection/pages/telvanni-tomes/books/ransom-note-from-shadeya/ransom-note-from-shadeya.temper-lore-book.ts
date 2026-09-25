import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ransomNoteFromShadeya = {
  id: "01a0d60c-eb9c-732e-b6ed-dd773819d5ac",
  type: "page-type/temper-lore-book",
  slug: "ransom-note-from-shadeya",
  title: "Ransom Note from Shadeya",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7517,
  bookIndex: 71,
  charted: true,
  quest: 6998,
  positions: "jsonl",
} as const satisfies TemperLoreBook
