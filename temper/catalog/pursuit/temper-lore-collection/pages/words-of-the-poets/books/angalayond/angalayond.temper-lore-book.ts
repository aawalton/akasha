import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const angalayond = {
  id: "01a0d5f6-1c15-70ac-adcb-19d2ec114a57",
  type: "page-type/temper-lore-book",
  slug: "angalayond",
  title: "Angalayond",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 2156,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
