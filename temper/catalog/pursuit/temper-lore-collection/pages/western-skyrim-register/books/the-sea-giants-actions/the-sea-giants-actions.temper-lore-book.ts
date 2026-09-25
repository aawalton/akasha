import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSeaGiantsActions = {
  id: "01a0d60b-a362-735e-ba2b-619391d9d316",
  type: "page-type/temper-lore-book",
  slug: "the-sea-giants-actions",
  title: "The Sea Giant's Actions",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6035,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
