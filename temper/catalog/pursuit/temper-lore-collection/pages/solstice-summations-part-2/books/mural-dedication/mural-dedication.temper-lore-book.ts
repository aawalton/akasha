import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const muralDedication = {
  id: "01a0d60e-45b3-7a72-96e8-0a0b4039029a",
  type: "page-type/temper-lore-book",
  slug: "mural-dedication",
  title: "Mural Dedication",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8574,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
