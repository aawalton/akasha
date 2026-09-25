import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToVashabar = {
  id: "01a0d60d-4aaf-7c4f-93ce-f3f5603564bc",
  type: "page-type/temper-lore-book",
  slug: "letter-to-vashabar",
  title: "Letter to Vashabar",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7864,
  bookIndex: 76,
  charted: true,
  quest: 7086,
  positions: "jsonl",
} as const satisfies TemperLoreBook
