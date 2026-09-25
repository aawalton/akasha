import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMemoriesOfSothaSil = {
  id: "01a0d60a-a214-7efb-a11d-9fddc92c39c3",
  type: "page-type/temper-lore-book",
  slug: "the-memories-of-sotha-sil",
  title: "The Memories of Sotha Sil",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4607,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
