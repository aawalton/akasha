import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dalennForster = {
  id: "01a0d60d-4aaf-7fb7-ac12-094d7a06fc9e",
  type: "page-type/temper-lore-book",
  slug: "dalenn-forster",
  title: "Dalenn Forster",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7936,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
