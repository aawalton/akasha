import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const freiwensDiary = {
  id: "01a0d60b-8107-7c5e-92b3-eeb146f02a77",
  type: "page-type/temper-lore-book",
  slug: "freiwens-diary",
  title: "Freiwen's Diary",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5816,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
