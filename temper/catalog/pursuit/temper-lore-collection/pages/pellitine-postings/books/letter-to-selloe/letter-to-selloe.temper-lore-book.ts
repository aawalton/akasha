import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToSelloe = {
  id: "01a0d60b-4e02-7313-9cf7-06fa2407414e",
  type: "page-type/temper-lore-book",
  slug: "letter-to-selloe",
  title: "Letter to Selloe",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5714,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
