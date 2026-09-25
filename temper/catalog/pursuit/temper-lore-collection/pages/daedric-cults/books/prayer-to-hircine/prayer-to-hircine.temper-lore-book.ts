import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const prayerToHircine = {
  id: "01a0d5f2-253b-7141-9491-71b5b57703b7",
  type: "page-type/temper-lore-book",
  slug: "prayer-to-hircine",
  title: "Prayer to Hircine",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 790,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
