import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scalesOfShadow = {
  id: "01a0d5f6-a29a-760c-b68a-78bb76ca0bb2",
  type: "page-type/temper-lore-book",
  slug: "scales-of-shadow",
  title: "Scales of Shadow",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5360,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
