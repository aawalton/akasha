import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSecondAkaviriInvasion = {
  id: "01a0d5e4-4cb1-7043-9b03-189817d99a9b",
  type: "page-type/temper-lore-book",
  slug: "the-second-akaviri-invasion",
  title: "The Second Akaviri Invasion",
  collection: "temper-lore-collection/tamriel-history",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
