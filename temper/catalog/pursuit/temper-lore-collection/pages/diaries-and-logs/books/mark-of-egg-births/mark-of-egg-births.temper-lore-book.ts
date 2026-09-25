import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const markOfEggBirths = {
  id: "01a0d5f2-509f-7369-8282-441155947cfe",
  type: "page-type/temper-lore-book",
  slug: "mark-of-egg-births",
  title: "Mark of Egg-Births",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 726,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
