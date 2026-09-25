import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trynsSmithingNotes = {
  id: "01a0d5f2-db27-76e3-862d-92d42bc9711c",
  type: "page-type/temper-lore-book",
  slug: "tryns-smithing-notes",
  title: "Tryn's Smithing Notes",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 350,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
