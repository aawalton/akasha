import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDarkSpirits = {
  id: "01a0d60b-4e03-7e0a-acfe-e18b4bee0071",
  type: "page-type/temper-lore-book",
  slug: "the-dark-spirits",
  title: "The Dark Spirits",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5726,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
