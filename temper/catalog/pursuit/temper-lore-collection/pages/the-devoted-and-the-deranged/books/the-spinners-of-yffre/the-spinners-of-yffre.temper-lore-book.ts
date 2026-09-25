import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSpinnersOfYffre = {
  id: "01a0d5f5-abbb-7574-930a-8da92065339e",
  type: "page-type/temper-lore-book",
  slug: "the-spinners-of-yffre",
  title: "The Spinners of Y'ffre",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 623,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
