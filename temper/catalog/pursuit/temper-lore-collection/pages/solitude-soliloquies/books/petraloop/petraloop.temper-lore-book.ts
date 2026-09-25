import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const petraloop = {
  id: "01a0d60b-8108-7cc4-9d4b-e01ccb6cb056",
  type: "page-type/temper-lore-book",
  slug: "petraloop",
  title: "Petraloop",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5902,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
