import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const needfulThings = {
  id: "01a0d5f7-73fa-72e6-9439-530f5113972d",
  type: "page-type/temper-lore-book",
  slug: "needful-things",
  title: "Needful Things",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3690,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
