import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myDearestLove = {
  id: "01a0d5f2-af70-717d-b4c0-babfe79dc07e",
  type: "page-type/temper-lore-book",
  slug: "my-dearest-love",
  title: "My Dearest Love",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 4115,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
