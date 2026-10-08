import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const follyOfMan = {
  id: "01a0d60a-d5bc-727e-877a-5a2f0b28b16d",
  type: "page-type/temper-lore-book",
  slug: "folly-of-man",
  title: "Folly of Man",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5115,
  charted: true,
  quest: 6142,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:29.436Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
