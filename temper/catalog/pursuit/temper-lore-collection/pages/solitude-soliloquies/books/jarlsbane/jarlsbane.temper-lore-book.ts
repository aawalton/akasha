import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jarlsbane = {
  id: "01a0d60b-8108-741c-9e5c-5dab5970ea4e",
  type: "page-type/temper-lore-book",
  slug: "jarlsbane",
  title: "Jarlsbane",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5916,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
