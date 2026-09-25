import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromThukhozod = {
  id: "01a0d5f6-d68b-7a52-8fd2-5a055f7fb146",
  type: "page-type/temper-lore-book",
  slug: "letter-from-thukhozod",
  title: "Letter from Thukhozod",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2752,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
