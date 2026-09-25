import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fromNirnToTheAether = {
  id: "01a0d5f5-1384-71b8-87ad-44a617c6a476",
  type: "page-type/temper-lore-book",
  slug: "from-nirn-to-the-aether",
  title: "From Nirn to the Aether",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 2210,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
