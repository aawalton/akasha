import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toAnchoriteGaius = {
  id: "01a0d5f2-253c-7eb5-94cf-c83b3ec8ffed",
  type: "page-type/temper-lore-book",
  slug: "to-anchorite-gaius",
  title: "To Anchorite Gaius",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1374,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
