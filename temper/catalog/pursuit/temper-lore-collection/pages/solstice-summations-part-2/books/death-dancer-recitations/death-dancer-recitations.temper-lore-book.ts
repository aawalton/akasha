import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deathDancerRecitations = {
  id: "01a0d60e-45b2-7204-87b7-0100478ae14d",
  type: "page-type/temper-lore-book",
  slug: "death-dancer-recitations",
  title: "Death-Dancer Recitations",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8620,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
