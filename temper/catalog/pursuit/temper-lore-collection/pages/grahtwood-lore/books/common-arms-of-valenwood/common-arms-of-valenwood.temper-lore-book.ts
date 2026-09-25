import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const commonArmsOfValenwood = {
  id: "01a0d5e4-d87c-713f-a5fc-ea1d126b34bc",
  type: "page-type/temper-lore-book",
  slug: "common-arms-of-valenwood",
  title: "Common Arms of Valenwood",
  collection: "temper-lore-collection/grahtwood-lore",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
