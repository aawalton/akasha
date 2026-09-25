import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const authorsAssistantWanted = {
  id: "01a0d60b-fdaf-7283-8955-484ee9fb1818",
  type: "page-type/temper-lore-book",
  slug: "authors-assistant-wanted",
  title: "Author's Assistant Wanted!",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6579,
  bookIndex: 77,
  charted: true,
  quest: 6634,
  positions: "jsonl",
} as const satisfies TemperLoreBook
