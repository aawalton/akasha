import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oldOrcSayingsShields = {
  id: "01a0d5f7-160b-7c7a-a8ab-707d8fc35946",
  type: "page-type/temper-lore-book",
  slug: "old-orc-sayings-shields",
  title: "Old Orc Sayings: Shields",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 2734,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
