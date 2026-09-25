import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const birdsOfWrothgar = {
  id: "01a0d5f6-d68a-736d-8028-1686a624d8f3",
  type: "page-type/temper-lore-book",
  slug: "birds-of-wrothgar",
  title: "Birds of Wrothgar",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2751,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
