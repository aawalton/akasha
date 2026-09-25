import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anEndToIsolation = {
  id: "01a0d60a-d5bc-710d-973d-a0077f2cbb63",
  type: "page-type/temper-lore-book",
  slug: "an-end-to-isolation",
  title: "An End to Isolation",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4848,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
