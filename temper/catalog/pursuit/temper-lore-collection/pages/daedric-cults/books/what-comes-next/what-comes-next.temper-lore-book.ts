import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whatComesNext = {
  id: "01a0d5f2-253c-7382-af09-77b4b6968968",
  type: "page-type/temper-lore-book",
  slug: "what-comes-next",
  title: "What Comes Next",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2132,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
