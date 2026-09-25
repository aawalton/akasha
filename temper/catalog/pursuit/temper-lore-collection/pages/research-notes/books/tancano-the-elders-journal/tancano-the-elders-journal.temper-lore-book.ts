import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tancanoTheEldersJournal = {
  id: "01a0d5f5-1385-704d-bb01-db377f8af412",
  type: "page-type/temper-lore-book",
  slug: "tancano-the-elders-journal",
  title: "Tancano the Elder's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 946,
  bookIndex: 36,
  charted: true,
  quest: 4339,
  positions: "jsonl",
} as const satisfies TemperLoreBook
