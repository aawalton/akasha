import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSeaItRises = {
  id: "01a0d5f6-1c16-7fbc-9f65-c252adfbca61",
  type: "page-type/temper-lore-book",
  slug: "the-sea-it-rises",
  title: "The Sea It Rises",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 2074,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
