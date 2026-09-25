import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const allFearAgrakh = {
  id: "01a0d5f2-83a2-787f-9efb-79bde455e37d",
  type: "page-type/temper-lore-book",
  slug: "all-fear-agrakh",
  title: "All Fear Agrakh",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1043,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
