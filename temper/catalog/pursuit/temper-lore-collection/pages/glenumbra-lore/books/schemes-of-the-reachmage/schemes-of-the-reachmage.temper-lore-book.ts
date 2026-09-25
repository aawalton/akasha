import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const schemesOfTheReachmage = {
  id: "01a0d5e2-da85-7bec-bd6a-4bbb4d49f01c",
  type: "page-type/temper-lore-book",
  slug: "schemes-of-the-reachmage",
  title: "Schemes of the Reachmage",
  collection: "temper-lore-collection/glenumbra-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
