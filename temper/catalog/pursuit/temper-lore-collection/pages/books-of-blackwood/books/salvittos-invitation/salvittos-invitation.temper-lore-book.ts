import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const salvittosInvitation = {
  id: "01a0d60b-fdb1-782a-b0a6-43756fc9fabe",
  type: "page-type/temper-lore-book",
  slug: "salvittos-invitation",
  title: "Salvitto's Invitation",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6677,
  bookIndex: 30,
  charted: true,
  quest: 6619,
  positions: "jsonl",
} as const satisfies TemperLoreBook
