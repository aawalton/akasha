import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const initiatesLastSight = {
  id: "01a0d60d-708d-73fa-acfe-f28a8a4d6f36",
  type: "page-type/temper-lore-book",
  slug: "initiates-last-sight",
  title: "Initiate's Last Sight",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7847,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
