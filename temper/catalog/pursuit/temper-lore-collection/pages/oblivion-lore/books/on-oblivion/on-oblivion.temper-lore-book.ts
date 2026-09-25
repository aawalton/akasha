import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onOblivion = {
  id: "01a0d5e4-2557-7593-a8ce-120f73b365cc",
  type: "page-type/temper-lore-book",
  slug: "on-oblivion",
  title: "On Oblivion",
  collection: "temper-lore-collection/oblivion-lore",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
