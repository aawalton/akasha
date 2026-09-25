import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfJusticiarAvanaire = {
  id: "01a0d60a-d5bd-708e-982f-92c0cfd62992",
  type: "page-type/temper-lore-book",
  slug: "journal-of-justiciar-avanaire",
  title: "Journal of Justiciar Avanaire",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4876,
  bookIndex: 44,
  charted: true,
  quest: 6144,
  positions: "jsonl",
} as const satisfies TemperLoreBook
