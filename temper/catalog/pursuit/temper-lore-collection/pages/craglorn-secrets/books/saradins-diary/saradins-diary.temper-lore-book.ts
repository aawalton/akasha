import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const saradinsDiary = {
  id: "01a0d5f1-c91b-7c9d-af04-045d1eb6c7a7",
  type: "page-type/temper-lore-book",
  slug: "saradins-diary",
  title: "Saradin's Diary",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2676,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
