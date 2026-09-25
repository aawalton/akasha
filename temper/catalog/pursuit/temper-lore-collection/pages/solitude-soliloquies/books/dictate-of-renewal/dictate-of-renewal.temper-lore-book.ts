import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dictateOfRenewal = {
  id: "01a0d60b-8107-7c52-a8dc-1ac3dc6472d1",
  type: "page-type/temper-lore-book",
  slug: "dictate-of-renewal",
  title: "Dictate of Renewal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6085,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
