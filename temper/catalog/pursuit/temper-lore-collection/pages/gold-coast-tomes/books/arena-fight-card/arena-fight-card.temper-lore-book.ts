import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const arenaFightCard = {
  id: "01a0d5f7-73f9-73a0-86db-a99ec6a2d1f6",
  type: "page-type/temper-lore-book",
  slug: "arena-fight-card",
  title: "Arena Fight Card",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3683,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
