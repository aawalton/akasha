import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wantedSgolag = {
  id: "01a0d5f2-83a3-76b4-bccb-33cd3043981c",
  type: "page-type/temper-lore-book",
  slug: "wanted-sgolag",
  title: "Wanted: Sgolag",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2047,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
