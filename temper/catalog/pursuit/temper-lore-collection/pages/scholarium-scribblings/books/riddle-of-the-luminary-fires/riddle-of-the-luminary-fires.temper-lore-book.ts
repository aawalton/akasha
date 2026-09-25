import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const riddleOfTheLuminaryFires = {
  id: "01a0d60d-9a64-7908-ae95-0a21ab65fbda",
  type: "page-type/temper-lore-book",
  slug: "riddle-of-the-luminary-fires",
  title: "Riddle of the Luminary Fires",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8097,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
