import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const allOurPerfectForms = {
  id: "01a0d5f3-3fda-7001-99fe-25d87fe6ba92",
  type: "page-type/temper-lore-book",
  slug: "all-our-perfect-forms",
  title: "All Our Perfect Forms",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 7940,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
