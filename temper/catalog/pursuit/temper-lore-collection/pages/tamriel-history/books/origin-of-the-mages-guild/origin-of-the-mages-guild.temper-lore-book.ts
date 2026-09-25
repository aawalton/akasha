import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const originOfTheMagesGuild = {
  id: "01a0d5e4-4cb1-7324-b41c-bb0917a0365a",
  type: "page-type/temper-lore-book",
  slug: "origin-of-the-mages-guild",
  title: "Origin of the Mages Guild",
  collection: "temper-lore-collection/tamriel-history",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
