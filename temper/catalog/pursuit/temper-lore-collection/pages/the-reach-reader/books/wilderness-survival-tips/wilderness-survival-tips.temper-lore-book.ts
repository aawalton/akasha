import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wildernessSurvivalTips = {
  id: "01a0d60b-c958-7c58-a2d6-ffe000bbac7e",
  type: "page-type/temper-lore-book",
  slug: "wilderness-survival-tips",
  title: "Wilderness Survival Tips",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 5962,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
