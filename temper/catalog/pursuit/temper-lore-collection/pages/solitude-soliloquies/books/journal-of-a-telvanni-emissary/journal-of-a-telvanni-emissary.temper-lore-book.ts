import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfATelvanniEmissary = {
  id: "01a0d60b-8108-7575-bb64-1f628611aa10",
  type: "page-type/temper-lore-book",
  slug: "journal-of-a-telvanni-emissary",
  title: "Journal of a Telvanni Emissary",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6222,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
