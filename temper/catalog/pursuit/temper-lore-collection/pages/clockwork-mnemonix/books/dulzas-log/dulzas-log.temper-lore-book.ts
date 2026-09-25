import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dulzasLog = {
  id: "01a0d60a-a213-749c-b80c-b089f21c4a7c",
  type: "page-type/temper-lore-book",
  slug: "dulzas-log",
  title: "Dulza's Log",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4680,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
