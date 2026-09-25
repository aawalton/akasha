import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lilytongue = {
  id: "01a0d60b-8108-7582-aac1-f0c2750f90f7",
  type: "page-type/temper-lore-book",
  slug: "lilytongue",
  title: "Lilytongue",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5908,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
