import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWayOfTheBlade = {
  id: "01a0d5f1-c91b-77c5-844b-101636cb074d",
  type: "page-type/temper-lore-book",
  slug: "the-way-of-the-blade",
  title: "The Way of the Blade",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2362,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
