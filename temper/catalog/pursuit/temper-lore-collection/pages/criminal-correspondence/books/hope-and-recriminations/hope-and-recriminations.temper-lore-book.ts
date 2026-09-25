import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hopeAndRecriminations = {
  id: "01a0d5f1-f451-7ba9-ad15-2182d4cabb01",
  type: "page-type/temper-lore-book",
  slug: "hope-and-recriminations",
  title: "Hope and Recriminations",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1214,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
