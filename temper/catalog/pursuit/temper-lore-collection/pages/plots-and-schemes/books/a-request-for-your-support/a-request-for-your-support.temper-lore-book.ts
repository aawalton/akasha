import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aRequestForYourSupport = {
  id: "01a0d5f4-c382-7ddf-a650-6e6364bc53d3",
  type: "page-type/temper-lore-book",
  slug: "a-request-for-your-support",
  title: "A Request for Your Support",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1019,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
