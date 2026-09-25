import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guthragsMask = {
  id: "01a0d5f6-d68a-7147-a421-8bb78896f28a",
  type: "page-type/temper-lore-book",
  slug: "guthrags-mask",
  title: "Guthrag's Mask",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3121,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
