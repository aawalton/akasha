import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCallForRecollection = {
  id: "01a0d5f2-2539-7e59-a196-0121d6dade88",
  type: "page-type/temper-lore-book",
  slug: "a-call-for-recollection",
  title: "A Call for Recollection",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7856,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
