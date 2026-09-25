import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tutorRipariussList = {
  id: "01a0d60d-708e-7d26-a020-c41b65c7e6bc",
  type: "page-type/temper-lore-book",
  slug: "tutor-ripariuss-list",
  title: "Tutor Riparius's List",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7845,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
