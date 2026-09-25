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
} as const satisfies TemperLoreBook
