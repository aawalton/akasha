import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stonefireRitualTome = {
  id: "01a0d5f2-253b-711b-b62b-06b5cd95a5f3",
  type: "page-type/temper-lore-book",
  slug: "stonefire-ritual-tome",
  title: "Stonefire Ritual Tome",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 149,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
