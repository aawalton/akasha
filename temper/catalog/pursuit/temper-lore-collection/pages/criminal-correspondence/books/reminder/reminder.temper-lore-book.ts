import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reminder = {
  id: "01a0d5f1-f451-7201-a4e3-b26d5d846d55",
  type: "page-type/temper-lore-book",
  slug: "reminder",
  title: "Reminder",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 502,
  bookIndex: 14,
  charted: true,
  quest: 4210,
  positions: "jsonl",
} as const satisfies TemperLoreBook
