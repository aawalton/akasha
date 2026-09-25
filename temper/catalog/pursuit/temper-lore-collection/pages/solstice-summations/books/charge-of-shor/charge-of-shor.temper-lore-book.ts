import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chargeOfShor = {
  id: "01a0d60d-ff69-75b5-ab88-3af7f58152dc",
  type: "page-type/temper-lore-book",
  slug: "charge-of-shor",
  title: "Charge of Shor",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8313,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
