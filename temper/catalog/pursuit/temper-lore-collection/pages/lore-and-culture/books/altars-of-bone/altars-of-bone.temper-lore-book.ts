import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const altarsOfBone = {
  id: "01a0d5f3-3fda-7871-afa8-78cfb0ef7c48",
  type: "page-type/temper-lore-book",
  slug: "altars-of-bone",
  title: "Altars of Bone",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 402,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
