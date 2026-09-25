import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theShipOfIce = {
  id: "01a0d60d-9a64-7b73-a66c-a7fe3e392dd8",
  type: "page-type/temper-lore-book",
  slug: "the-ship-of-ice",
  title: "The Ship of Ice",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8167,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
