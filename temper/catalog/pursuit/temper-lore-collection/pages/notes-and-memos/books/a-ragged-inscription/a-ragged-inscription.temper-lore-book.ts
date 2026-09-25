import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aRaggedInscription = {
  id: "01a0d5f4-3c11-70ef-8ae3-b93949a239ff",
  type: "page-type/temper-lore-book",
  slug: "a-ragged-inscription",
  title: "A Ragged Inscription",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1064,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
