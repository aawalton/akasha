import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ertivalsRecounting = {
  id: "01a0d60a-d5bc-7111-b079-d72ae5f6ce05",
  type: "page-type/temper-lore-book",
  slug: "ertivals-recounting",
  title: "Ertival's Recounting",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5120,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
