import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToAmirmil = {
  id: "01a0d5f1-c91a-771f-a722-b825917cf2f2",
  type: "page-type/temper-lore-book",
  slug: "letter-to-amirmil",
  title: "Letter to Amirmil",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2660,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
