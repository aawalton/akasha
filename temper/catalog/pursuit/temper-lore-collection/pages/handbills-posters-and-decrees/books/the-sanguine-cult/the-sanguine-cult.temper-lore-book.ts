import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSanguineCult = {
  id: "01a0d5f2-83a3-769e-825c-6f526cbc4fa4",
  type: "page-type/temper-lore-book",
  slug: "the-sanguine-cult",
  title: "The Sanguine Cult",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 566,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
