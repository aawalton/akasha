import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const quentinsSecretCorrespondence = {
  id: "01a0d60b-fdb0-72ef-b33b-a32732a2fc3e",
  type: "page-type/temper-lore-book",
  slug: "quentins-secret-correspondence",
  title: "Quentin's Secret Correspondence",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6455,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
