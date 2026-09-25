import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chargeOfTheWelkynar = {
  id: "01a0d60a-d5bc-7ae6-b3c7-2f84b6f198d1",
  type: "page-type/temper-lore-book",
  slug: "charge-of-the-welkynar",
  title: "Charge of the Welkynar",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5095,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
