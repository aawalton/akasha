import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ulfsildsNote = {
  id: "01a0d60d-9a64-729d-98c2-9ca5c9a1cebd",
  type: "page-type/temper-lore-book",
  slug: "ulfsilds-note",
  title: "Ulfsild's Note",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8003,
  bookIndex: 50,
  charted: true,
  quest: 7104,
  positions: "jsonl",
} as const satisfies TemperLoreBook
