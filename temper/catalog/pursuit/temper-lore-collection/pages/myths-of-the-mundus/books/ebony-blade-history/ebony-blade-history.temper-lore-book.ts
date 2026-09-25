import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ebonyBladeHistory = {
  id: "01a0d5e4-11d7-73bf-ad4b-b24e2c420312",
  type: "page-type/temper-lore-book",
  slug: "ebony-blade-history",
  title: "Ebony Blade History",
  collection: "temper-lore-collection/myths-of-the-mundus",
  bookIndex: 3,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
