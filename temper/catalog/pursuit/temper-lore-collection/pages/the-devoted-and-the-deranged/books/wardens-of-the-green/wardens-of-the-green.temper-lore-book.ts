import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wardensOfTheGreen = {
  id: "01a0d5f5-abbb-73bc-a3c2-921a99f184c3",
  type: "page-type/temper-lore-book",
  slug: "wardens-of-the-green",
  title: "Wardens of the Green",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1762,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
