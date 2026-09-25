import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const howlsInTheNight = {
  id: "01a0d5f5-f3e4-7b07-8074-a5755f0c421d",
  type: "page-type/temper-lore-book",
  slug: "howls-in-the-night",
  title: "Howls in the Night",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 370,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
