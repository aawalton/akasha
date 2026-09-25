import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const odeToAuridon = {
  id: "01a0d5f6-1c16-717c-b682-88aef9d60e79",
  type: "page-type/temper-lore-book",
  slug: "ode-to-auridon",
  title: "Ode to Auridon",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 582,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
