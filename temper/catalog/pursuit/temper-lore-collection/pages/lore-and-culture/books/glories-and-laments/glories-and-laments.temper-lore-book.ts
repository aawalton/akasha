import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gloriesAndLaments = {
  id: "01a0d5f3-3fda-7a55-98cc-42b3cb0c3b34",
  type: "page-type/temper-lore-book",
  slug: "glories-and-laments",
  title: "Glories and Laments",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1156,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
