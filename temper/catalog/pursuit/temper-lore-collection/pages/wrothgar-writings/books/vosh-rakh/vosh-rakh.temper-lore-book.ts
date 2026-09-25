import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const voshRakh = {
  id: "01a0d5f6-d68c-75a9-9021-a908062c2af7",
  type: "page-type/temper-lore-book",
  slug: "vosh-rakh",
  title: "Vosh Rakh",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3026,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
