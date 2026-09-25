import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myBelovedSiblingsTheExarchs = {
  id: "01a0d60b-8108-7232-8fb6-16abdd785dad",
  type: "page-type/temper-lore-book",
  slug: "my-beloved-siblings-the-exarchs",
  title: "My Beloved Siblings, the Exarchs",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6032,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
