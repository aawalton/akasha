import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const darkContract = {
  id: "01a0d5f2-253a-77ba-9a4f-8692de514841",
  type: "page-type/temper-lore-book",
  slug: "dark-contract",
  title: "Dark Contract",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 552,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
