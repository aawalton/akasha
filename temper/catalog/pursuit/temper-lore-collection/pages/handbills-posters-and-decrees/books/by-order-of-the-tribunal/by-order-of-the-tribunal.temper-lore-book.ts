import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const byOrderOfTheTribunal = {
  id: "01a0d5f2-83a2-7461-911e-0a32a3ab15f0",
  type: "page-type/temper-lore-book",
  slug: "by-order-of-the-tribunal",
  title: "By Order of the Tribunal",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2475,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
