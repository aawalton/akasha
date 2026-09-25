import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lastWarningCat = {
  id: "01a0d5f1-f451-7083-bc68-caae66600f88",
  type: "page-type/temper-lore-book",
  slug: "last-warning-cat",
  title: "Last Warning, Cat",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1516,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
