import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aedraAndDaedra = {
  id: "01a0d5e3-6b60-77d5-8a9c-00a6a16895a8",
  type: "page-type/temper-lore-book",
  slug: "aedra-and-daedra",
  title: "Aedra and Daedra",
  collection: "temper-lore-collection/daedric-princes",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
