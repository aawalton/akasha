import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wantedTervurSadri = {
  id: "01a0d5f2-83a3-79cf-9f11-15467e9a082a",
  type: "page-type/temper-lore-book",
  slug: "wanted-tervur-sadri",
  title: "WANTED: Tervur Sadri",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 504,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
