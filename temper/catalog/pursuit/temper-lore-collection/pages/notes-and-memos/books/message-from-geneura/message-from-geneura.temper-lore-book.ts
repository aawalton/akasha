import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const messageFromGeneura = {
  id: "01a0d5f4-3c12-702d-90ba-b0464009d876",
  type: "page-type/temper-lore-book",
  slug: "message-from-geneura",
  title: "Message from Geneura",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1760,
  bookIndex: 63,
  charted: true,
  quest: 4714,
  positions: "jsonl",
} as const satisfies TemperLoreBook
