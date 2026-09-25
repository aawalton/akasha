import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vastariesJournal = {
  id: "01a0d5f4-6f1b-73ed-9825-b6d456dff5ef",
  type: "page-type/temper-lore-book",
  slug: "vastaries-journal",
  title: "Vastarie's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1807,
  bookIndex: 71,
  charted: true,
  quest: 4842,
  positions: "jsonl",
} as const satisfies TemperLoreBook
