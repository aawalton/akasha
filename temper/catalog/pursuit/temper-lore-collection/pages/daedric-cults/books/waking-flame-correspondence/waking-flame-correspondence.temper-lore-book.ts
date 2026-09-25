import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wakingFlameCorrespondence = {
  id: "01a0d5f2-253c-7556-821f-830048613c74",
  type: "page-type/temper-lore-book",
  slug: "waking-flame-correspondence",
  title: "Waking Flame Correspondence",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 6771,
  bookIndex: 99,
  charted: true,
  quest: 6701,
  positions: "jsonl",
} as const satisfies TemperLoreBook
