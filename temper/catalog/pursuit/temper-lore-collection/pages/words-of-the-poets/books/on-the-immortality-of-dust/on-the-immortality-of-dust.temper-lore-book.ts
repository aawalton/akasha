import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheImmortalityOfDust = {
  id: "01a0d5f6-1c16-7b62-b9ec-626fee2d1624",
  type: "page-type/temper-lore-book",
  slug: "on-the-immortality-of-dust",
  title: "On the Immortality of Dust",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1520,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
