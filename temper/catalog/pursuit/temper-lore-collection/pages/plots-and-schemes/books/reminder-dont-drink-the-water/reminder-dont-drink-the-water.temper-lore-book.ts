import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reminderDontDrinkTheWater = {
  id: "01a0d5f4-c389-7b90-a1e3-761588fe3810",
  type: "page-type/temper-lore-book",
  slug: "reminder-dont-drink-the-water",
  title: "Reminder: Don't Drink the Water",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 735,
  bookIndex: 22,
  charted: true,
  quest: 3659,
  positions: "jsonl",
} as const satisfies TemperLoreBook
