import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBrokenOath = {
  id: "01a0d60c-75b6-7bce-9fca-44fb9d5411cc",
  type: "page-type/temper-lore-book",
  slug: "the-broken-oath",
  title: "The Broken Oath",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6933,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
