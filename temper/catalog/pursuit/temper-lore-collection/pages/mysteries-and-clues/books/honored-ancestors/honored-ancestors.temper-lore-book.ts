import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const honoredAncestors = {
  id: "01a0d5f4-07b8-7256-82eb-3c25e0ae60eb",
  type: "page-type/temper-lore-book",
  slug: "honored-ancestors",
  title: "Honored Ancestors",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4007,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
