import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const illuminus = {
  id: "01a0d60a-d5bc-767b-b906-b06830746dd8",
  type: "page-type/temper-lore-book",
  slug: "illuminus",
  title: "Illuminus",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5000,
  charted: true,
  quest: 6115,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:29.436Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
