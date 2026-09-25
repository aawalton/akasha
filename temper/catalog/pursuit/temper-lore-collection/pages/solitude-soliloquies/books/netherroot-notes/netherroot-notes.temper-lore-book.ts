import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const netherrootNotes = {
  id: "01a0d60b-8108-725e-bdd2-f955ed7f54d7",
  type: "page-type/temper-lore-book",
  slug: "netherroot-notes",
  title: "Netherroot Notes",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5772,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
