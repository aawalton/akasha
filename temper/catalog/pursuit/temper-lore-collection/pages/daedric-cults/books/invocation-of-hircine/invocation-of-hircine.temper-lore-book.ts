import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const invocationOfHircine = {
  id: "01a0d5f2-253a-7fec-ac48-ec13da9d8c7c",
  type: "page-type/temper-lore-book",
  slug: "invocation-of-hircine",
  title: "Invocation of Hircine",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1835,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
