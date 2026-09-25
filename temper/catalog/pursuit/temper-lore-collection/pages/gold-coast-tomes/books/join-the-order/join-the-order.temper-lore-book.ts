import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const joinTheOrder = {
  id: "01a0d5f7-73fa-77eb-8bf9-7cfaa8cd21bc",
  type: "page-type/temper-lore-book",
  slug: "join-the-order",
  title: "Join the Order!",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3591,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
