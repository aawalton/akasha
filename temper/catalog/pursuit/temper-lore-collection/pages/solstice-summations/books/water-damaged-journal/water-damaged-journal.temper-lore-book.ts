import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const waterDamagedJournal = {
  id: "01a0d60d-ff6a-773f-b3e5-dabd547eb039",
  type: "page-type/temper-lore-book",
  slug: "water-damaged-journal",
  title: "Water-Damaged Journal",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8383,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
