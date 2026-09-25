import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const monumentInn = {
  id: "01a0d60c-75b5-7c1a-8edc-771288a1f2b1",
  type: "page-type/temper-lore-book",
  slug: "monument-inn",
  title: "Monument Inn",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7182,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
