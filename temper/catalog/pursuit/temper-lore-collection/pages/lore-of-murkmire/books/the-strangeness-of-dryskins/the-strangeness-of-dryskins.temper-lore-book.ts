import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theStrangenessOfDryskins = {
  id: "01a0d5f6-a29b-72a7-b772-9f5f062807a0",
  type: "page-type/temper-lore-book",
  slug: "the-strangeness-of-dryskins",
  title: "The Strangeness of Dryskins",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5394,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
