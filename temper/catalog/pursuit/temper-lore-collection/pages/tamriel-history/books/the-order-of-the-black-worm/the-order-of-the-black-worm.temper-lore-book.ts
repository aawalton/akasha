import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theOrderOfTheBlackWorm = {
  id: "01a0d5e4-4cb1-7e86-baeb-68e232daed0e",
  type: "page-type/temper-lore-book",
  slug: "the-order-of-the-black-worm",
  title: "The Order of the Black Worm",
  collection: "temper-lore-collection/tamriel-history",
  bookIndex: 8,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
