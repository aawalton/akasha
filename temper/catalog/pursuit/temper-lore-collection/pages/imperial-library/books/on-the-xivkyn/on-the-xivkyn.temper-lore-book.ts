import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheXivkyn = {
  id: "01a0d5f6-f385-7da8-b97d-161b43e657bd",
  type: "page-type/temper-lore-book",
  slug: "on-the-xivkyn",
  title: "On the Xivkyn",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 3143,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
