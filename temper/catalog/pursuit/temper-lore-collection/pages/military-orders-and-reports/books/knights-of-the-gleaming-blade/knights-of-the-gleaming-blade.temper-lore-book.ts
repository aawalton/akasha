import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const knightsOfTheGleamingBlade = {
  id: "01a0d5f3-7053-7e79-a460-c58202fdc499",
  type: "page-type/temper-lore-book",
  slug: "knights-of-the-gleaming-blade",
  title: "Knights of the Gleaming Blade",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2087,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
