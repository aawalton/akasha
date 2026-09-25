import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kvatchArenaReopens = {
  id: "01a0d5f7-73fa-75df-86b6-28ea3069a426",
  type: "page-type/temper-lore-book",
  slug: "kvatch-arena-reopens",
  title: "Kvatch Arena Reopens!",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3681,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
