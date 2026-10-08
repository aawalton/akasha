import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const silverDawnContract = {
  id: "01a0d5f7-73fa-7584-aa94-4ceca7d59275",
  type: "page-type/temper-lore-book",
  slug: "silver-dawn-contract",
  title: "Silver Dawn Contract",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3582,
  bookIndex: 20,
  charted: true,
  quest: 5599,
  positions: "jsonl",
  createdAt: "2026-09-25T00:29:19.226Z",
  updatedAt: "2026-09-25T00:29:21.000Z",
} as const satisfies TemperLoreBook
