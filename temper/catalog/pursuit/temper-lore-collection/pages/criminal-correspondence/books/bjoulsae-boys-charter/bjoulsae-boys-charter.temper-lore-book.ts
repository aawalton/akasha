import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bjoulsaeBoysCharter = {
  id: "01a0d5f1-f450-7033-bad8-53c47ac260fe",
  type: "page-type/temper-lore-book",
  slug: "bjoulsae-boys-charter",
  title: "Bjoulsae Boys Charter",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 110,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
