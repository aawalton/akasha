import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sheltered = {
  id: "01a0d5f2-83a3-7f53-9bd6-bfc58a56f253",
  type: "page-type/temper-lore-book",
  slug: "sheltered",
  title: "Sheltered",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2513,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
