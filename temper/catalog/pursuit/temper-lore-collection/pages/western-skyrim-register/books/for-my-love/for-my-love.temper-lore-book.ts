import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forMyLove = {
  id: "01a0d60b-a361-703e-90c0-0e4747fdece1",
  type: "page-type/temper-lore-book",
  slug: "for-my-love",
  title: "For My Love",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 5926,
  bookIndex: 2,
  charted: true,
  quest: 6460,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:22.081Z",
  updatedAt: "2026-09-25T00:51:23.000Z",
} as const satisfies TemperLoreBook
