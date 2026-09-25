import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToTarnamir = {
  id: "01a0d60a-d5bd-747d-a26e-a8a4ab56a516",
  type: "page-type/temper-lore-book",
  slug: "letter-to-tarnamir",
  title: "Letter to Tarnamir",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4836,
  bookIndex: 70,
  charted: true,
  quest: 6135,
  positions: "jsonl",
} as const satisfies TemperLoreBook
