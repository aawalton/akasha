import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const keeperOrmisJournal = {
  id: "01a0d5f4-6f1a-7258-a3b5-c60e0434ac3d",
  type: "page-type/temper-lore-book",
  slug: "keeper-ormis-journal",
  title: "Keeper Ormi's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 307,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
