import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onExtendingExistence = {
  id: "01a0d5f7-aa99-7000-a740-630d43e8fe7d",
  type: "page-type/temper-lore-book",
  slug: "on-extending-existence",
  title: "On Extending Existence",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4113,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
