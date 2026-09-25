import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toWhomItMayConcern = {
  id: "01a0d5f2-253c-7a30-8055-dd3c43736d99",
  type: "page-type/temper-lore-book",
  slug: "to-whom-it-may-concern",
  title: "To Whom It May Concern",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2759,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
